<?php
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

$email = getBody("email");
$code = getBody("confirmation_code");
if (is_null($email)) array_push($res->errors, "missing email query");
if (is_null($code)) array_push($res->errors, "missing confirmation_code in body");
if (count($res->errors) == 0) {
    $result = DB::queryFirstRow("SELECT id, confirmation_code FROM ssys22_users WHERE email=%s LIMIT 1", $email);
    $success = false;
    if ($result['id']) {
        if ($result['confirmation_code'] == $code) {
            $puts = array();
            $puts['email_confirmed'] = true;
            DB::update('ssys22_users', $puts, "email=%s", $email);
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