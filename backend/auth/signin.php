<?php

use Symfony\Component\Dotenv\Dotenv;

//Imports
require_once __DIR__ . "/../vendor/autoload.php";
require_once __DIR__ . "/../models/response.php";
require_once __DIR__ . "/../modules/database.php"; //Connect to database
require_once __DIR__ . "/../modules/readParams.php";
require_once __DIR__ . "/tokens.php";

$dotenv = new Dotenv();

//Main
#Object declaraion
$res = new Response();

$email = getBody("email");
$password = getBody("password");
if (!$email) array_push($res->errors, "missing email query");
if (!$password) array_push($res->errors, "missing password query");
if (count($res->errors) == 0) {
    $query = "id, password_hash";
    $teacherResult = DB::queryFirstRow("SELECT " . $query . " FROM ssys22_teachers WHERE email=%s LIMIT 1", $email);
    $studentResult = DB::queryFirstRow("SELECT " . $query . " FROM ssys22_students WHERE email=%s LIMIT 1", $email);
    $success = false;
    if ($teacherResult['id']) {
        $hash = $teacherResult['password_hash'];
        $success = password_verify($password, $hash);
    } else if ($studentResult['id']) {
        $hash = $studentResult['password_hash'];
        $success = password_verify($password, $hash);
    } else {
        $res->status = 404;
        array_push($res->errors, "account not found");
    }
    if ($success) {
        $tokenBody = new tokenBody($email);
        $token = createToken($tokenBody);
        $res->status = 200;
        $res->success = true;
        $res->objects = $token;
    } else {
        array_push($res->errors, "signin failed");
    }
}
http_response_code($res->status);
echo json_encode($res);