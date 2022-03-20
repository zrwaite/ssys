<?php

assert($_SERVER['REQUEST_METHOD'] == "POST");

use Symfony\Component\Dotenv\Dotenv;

//Imports
require_once __DIR__ . "/../../vendor/autoload.php";
require_once __DIR__ . "/../../models/response.php";
require_once __DIR__ . "/../../modules/database.php"; //Connect to database
require_once __DIR__ . "/../../modules/readParams.php";
require_once __DIR__ . "/../../models/user.php";

$dotenv = new Dotenv();
$dotenv->load(__DIR__ . "/../../modules/env/.env");
//todo assert name length
//Main
//Object declaraion
$res = new Response();
$res->request_type = "POST";
$user = new PostUser();

//get post queries
$user->email = getBody("email");
if (is_null($user->email)) array_push($res->errors, "Must include email");
else if (!$user->checkEmail()) array_push($res->errors, "Invalid email");
$user->user_type = getBody("user_type");
if (is_null($user->user_type)) array_push($res->errors, "Must include user_type");

if (count($res->errors) == 0) {
    $user->fname = getBody("fname");
    $user->lname = getBody("lname");
    $user->password = getBody("password");
    switch ($user->user_type) {
        case "individual": case "teacher":
            if (is_null($user->fname)) array_push($res->errors, "Must include fname");
            if (is_null($user->lname)) array_push($res->errors, "Must include lname");
            if (is_null($user->password)) array_push($res->errors, "Must include password");
            else $res->errors = array_merge($res->errors, $user->checkPassword());
            $user->password_set = true;
            break;
        case "student":
            $user->tryCreateName();
            if (is_null($user->password)) $user->createPassword();
            else {
                $res->errors = array_merge($res->errors, $user->checkPassword());
                $user->password_set = true;
            }
            //todo confirm teacher email matches id
            $user->teacher_email = getBody("teacher_email");
            if (is_null($user->teacher_email)) array_push($res->errors, "Must include teacher_email");
            $user->teacher_id = getBody("teacher_id");
            if (is_null($user->teacher_id)) array_push($res->errors, "Must include teacher_id");
            break;
        default:
            array_push($res->errors, "user_type must be individual, teacher or student");
            break;
    }
}
if (count($res->errors) == 0) {
    $user->createHash();
    $result = DB::queryFirstRow("SELECT id FROM ssys22_users WHERE email=%s LIMIT 1", $user->email);
    if (!$result) {
        if ($user->addUser()) {
            DB::insert('ssys22_users', array(
                'email' => $user->email,
                'fname' => $user->fname,
                'lname' => $user->lname,
                'password_hash' => $user->hash,
                'teacher_email' => $user->teacher_email,
                'teacher_id' => $user->teacher_id,
                'confirmation_code' => $user->confirmation_code,
                'user_type' => $user->user_type,
                'password_set' => $user->password_set,
                'workshop_choices' => $user->workshop_choices
            ));
            $user->sendEmailConfirmation();
            $res->status = 200;
            $res->success = true;
            $res->objects = $user->createResponse();
            //send email with link to confirm email page with confirmation_code
        } else array_push($res->errors, "Attendance full!");
    } else array_push($res->errors, "Email already in use");
}
http_response_code($res->status);
echo json_encode($res);