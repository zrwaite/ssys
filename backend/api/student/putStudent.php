<?php

assert($_SERVER['REQUEST_METHOD']=="PUT");

use Symfony\Component\Dotenv\Dotenv;

//Imports
require_once __DIR__."/../../vendor/autoload.php";
require_once __DIR__."/../../models/response.php";
require_once __DIR__."/../../modules/database.php"; //Connect to database
require_once __DIR__."/../../modules/readParams.php";
require_once __DIR__."/../../models/student.php";
require_once __DIR__."/../../modules/checkers.php";

$dotenv = new Dotenv();
$dotenv->load(__DIR__."/../../modules/env/.env");

//Main
$res = new Response();
$res->request_type = "PUT";

#get post queries
$email = getBody("email");
$puts = array();
if(!$email) array_push($res->errors, "Must include email");
else {
    $params = ["fname", "lname", "teacher_email", "teacher_id", "password", "grade", "image_link" ,"school", "shirt_size", "shirts_ordered", "city", "workshop_choices", "instagram", "diet", "workshop_order", "video_link", "bio", "additional_info", "emergency_contact", "registration_type"];
    for ($i = 0; $i < count($params); $i++) {
        $error = false;
        $param = getBody($params[$i]);
        if (!$param) continue; //If the parameter isn't defined continue, otherwise check the switch for special cases
        switch ($params[$i]) {
            case "teacher_email":
                if (!checkEmail($param)) {
                    $error = true;
                    array_push($res->errors, "teacher_email is invalid");
                }
                break;
            case "password":
                $password_errors = checkPassword($param);
                if (count($password_errors) != 0) {
                    $res->errors = array_merge($res->errors, $password_errors);
                    $error = true;
                }
                break;
            case "grade":
                if (!is_numeric($param)) {
                    $error = true;
                    array_push($res->errors, "grade must be a number");
                } else  $param = intval($param);
                break;
            //TODO implement all put request switch cases

        }
        if (!$error) $puts[$params[$i]] = $param;
    }
    if (count($puts)==0 && count($res->errors)==0) array_push($res->errors, "You didn't send anything to update ");
}
if (count($res->errors)==0){
    try {
        $result = DB::queryFirstRow("SELECT id FROM ssys22_students WHERE email=%s LIMIT 1", $email);
        if ($result){
            DB::update('ssys22_students', $puts, "email=%s", $email);
            $res->status = 200;
            $res->success = true;
        } else {
            $res->status = 404;
            array_push($res->errors, "Can not find student");
        }
    } catch (Exception $e) {
        echo 'Message: ' .$e->getMessage();
    }
}
http_response_code($res->status);
echo json_encode($res);