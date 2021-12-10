<?php

assert($_SERVER['REQUEST_METHOD'] == "PUT");

use Symfony\Component\Dotenv\Dotenv;

//Imports
require_once __DIR__ . "/../../vendor/autoload.php";
require_once __DIR__ . "/../../models/response.php";
require_once __DIR__ . "/../../modules/database.php"; //Connect to database
require_once __DIR__ . "/../../modules/readParams.php";
require_once __DIR__ . "/../../models/student.php";
require_once __DIR__ . "/../../modules/checkers.php";

$dotenv = new Dotenv();
$dotenv->load(__DIR__ . "/../../modules/env/.env");

//Main
$res = new Response();
$res->request_type = "PUT";
$student = new PutStudent();
//get post queries
$email = getBody("email");

$puts = array();
if (!$email) array_push($res->errors, "Must include email");
else {
    $student_puts_and_errors = $student->getPutArray($email);
    $res->errors = $student_puts_and_errors["errors"];
    $puts = $student_puts_and_errors["puts"];
    if (count($puts) == 0 && count($res->errors) == 0) array_push($res->errors, "You didn't send anything to update ");
}
if (count($res->errors) == 0) {
    try {
        $result = DB::queryFirstRow("SELECT id FROM ssys22_students WHERE email=%s LIMIT 1", $email);
        if ($result) {
            DB::update('ssys22_students', $puts, "email=%s", $email);
            $res->status = 200;
            $res->success = true;
        } else {
            $res->status = 404;
            array_push($res->errors, "Can not find student");
        }
    } catch (Exception $e) {
        echo 'Message: ' . $e->getMessage();
    }
}
http_response_code($res->status);
echo json_encode($res);