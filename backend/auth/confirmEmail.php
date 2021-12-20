<?php
header('Access-Control-Allow-Origin: *'); //dev allow localhost cors
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: POST, PUT, GET, DELETE");

//Imports
require_once __DIR__ . "/../vendor/autoload.php";
require_once __DIR__ . "/../models/response.php";
require_once __DIR__ . "/../modules/database.php"; //Connect to database
require_once __DIR__ . "/../modules/readParams.php";
require_once __DIR__ . "/tokens.php";

//Main
#Object declaraion
$res = new Response();
$res->request_type = $_SERVER["REQUEST_METHOD"];
if ($res->request_type != "POST") array_push($res->errors, "Must be POST request");

$email = getQuery("email");
$code = getBody("confirmation_code");
if (!$email) array_push($res->errors, "missing email query");
if (!$code) array_push($res->errors, "missing confirmation_code in body");
if (count($res->errors) == 0) {
    $query = "id, confirmation_code";
    $teacherResult = DB::queryFirstRow("SELECT " . $query . " FROM ssys22_teachers WHERE email=%sLIMIT 1", $email);
    $studentResult = DB::queryFirstRow("SELECT " . $query . " FROM ssys22_students WHERE email=%sLIMIT 1", $email);
    $success = false;
    if ($teacherResult['id']) {
        if ($teacherResult['confirmation_code'] == $code) {
            $puts = array();
            $puts['email_confirmed'] = true;
            DB::update('ssys22_teachers', $puts, "email=%s", $email);
            $success = true;
        } else {
            $success = false;
            array_push($res->errors, "incorrect code");
        }
    } else if ($studentResult['id']) {
        if ($studentResult['confirmation_code'] == $code) {
            $puts = array();
            $puts['email_confirmed'] = true;
            DB::update('ssys22_students', $puts, "email=%s", $email);
            $success = true;
        } else {
            $success = false;
            array_push($res->errors, "incorrect code");
        }
    } else {
        $res->status = 404;
        array_push($res->errors, "account not found");
    }
    if ($success) {
        $res->status = 200;
        $res->success = true;
    } else {
        array_push($res->errors, "confirmation failed");
    }
}
http_response_code($res->status);
echo json_encode($res);