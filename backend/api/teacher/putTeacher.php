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
$res = new Response();
$res->request_type = "PUT";
$teacher = new PutTeacher();

#get post queries
$puts = array();
$email = getBody("email");
if (!$email) array_push($res->errors, "Must include email");
else {
    $teacher_puts_and_errors = $teacher->getPutArray($email);
    $res->errors = $teacher_puts_and_errors["errors"];
    $puts = $teacher_puts_and_errors["puts"];
    if (count($puts) == 0 && count($res->errors) == 0) array_push($res->errors, "You didn't send anything to update ");
}
if (count($res->errors)==0){
    try {
        $result = DB::queryFirstRow("SELECT id FROM ssys22_teachers WHERE email=%s LIMIT 1", $email);
        if ($result){
            DB::update('ssys22_teachers', $puts, "email=%s", $email);
            $res->status = 200;
            $res->success = true;
        } else {
            $res->status = 404;
            array_push($res->errors, "Can not find dat teacher");
        }
    } catch (Exception $e) {
        echo 'Message: ' .$e->getMessage();
    }
}
http_response_code($res->status);
echo json_encode($res);