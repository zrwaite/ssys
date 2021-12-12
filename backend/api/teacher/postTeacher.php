<?php
//Imports
use Symfony\Component\Dotenv\Dotenv;

require_once __DIR__ . "/../../vendor/autoload.php";
require_once __DIR__ . "/../../models/response.php"; //Standardized response
require_once __DIR__ . "/../../modules/database.php"; //Connect to database
require_once __DIR__ . "/../../modules/readParams.php"; //Read body and query parameters as form data and json
require_once __DIR__ . "/../../models/teacher.php"; //Teacher api class

$dotenv = new Dotenv();
$dotenv->load(__DIR__ . "/../../modules/env/.env");

//Main
//Object declaration
$res = new Response();
$res->request_type = "POST";
$teacher = new PostTeacher();

//get post queries
$email = getBody("email");
if ($email) {
    $teacher->email = $email;
    if (!$teacher->checkEmail()) array_push($res->errors, "Invalid email");
} else array_push($res->errors, "Must include email");

$fname = getBody("fname");
if ($fname) $teacher->fname = $fname;
else array_push($res->errors, "Must include fname");

$lname = getBody("lname");
if ($lname) $teacher->lname = $lname;
else array_push($res->errors, "Must include lname");

$password = getBody("password");
if ($password) {
    $teacher->password = $password;
    $res->errors = array_merge($res->errors, $teacher->checkPassword());
} else array_push($res->errors, "Must include password");

if (count($res->errors) == 0) {
    $teacher->createHash();
    try {
        $result = DB::queryFirstRow("SELECT id FROM ssys22_teachers WHERE email=%s LIMIT 1", $email);
        if (!$result) {
            DB::insert('ssys22_teachers', array(
                'email' => $teacher->email,
                'fname' => $teacher->fname,
                'lname' => $teacher->lname,
                'password_hash' => $teacher->hash,
                'confirmation_code' => $teacher->confirmation_code
            ));
            $teacher->sendEmailConfirmation();
            $res->status = 200;
            $res->success = true;
            $res->objects = $teacher->createResponse();
            //send email with link to confirm email page with confirmation_code
        } else {
            array_push($res->errors, "Email already in use");
        }
    } catch (Exception $e) {
        echo 'Message: ' . $e->getMessage();
    }
}
http_response_code($res->status);
echo json_encode($res);