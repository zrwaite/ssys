<?php

assert($_SERVER['REQUEST_METHOD'] == "POST");

use Symfony\Component\Dotenv\Dotenv;

//Imports
require_once __DIR__ . "/../../vendor/autoload.php";
require_once __DIR__ . "/../../models/response.php";
require_once __DIR__ . "/../../modules/database.php"; //Connect to database
require_once __DIR__ . "/../../modules/readParams.php";
require_once __DIR__ . "/../../modules/checkers.php";
require_once __DIR__ . "/../../models/user.php";
require_once __DIR__ . "/../../models/code.php";

$dotenv = new Dotenv();
$dotenv->load(__DIR__ . "/../../modules/env/.env");
//todo assert name length
//Main
//Object declaraion
$res = new Response();
$res->request_type = "POST";
$user = new PostUser();

$bodyParams = array();

foreach (array_merge(userPostParams, ["code", "password"]) as $key) {
    $value = getBody($key);
    if (is_null($value)) array_push($res->errors, "Must include " . $key);
    else $bodyParams[$key] = $value;
}
//
if (count($res->errors) == 0) {
    foreach (userPostParams as $key) {
        $user->postData[$key] = $bodyParams[$key];
    }
    $user->password = $bodyParams["password"];
    $user->code = $bodyParams["code"];
    $res->errors = array_merge($res->errors, $user->checkPassword());
    $res->errors = array_merge($res->errors, $user->checkCode());
    if ($user->usernameInUse()) array_push($res->errors, "Username in use");
    if (!is_bool($bodyParams["teacher"])) array_push($res->errors, "invalid teacher value");
}
if (count($res->errors) == 0) {

    $user->createHash();
    if ($user->addUser()) {
        if ($user->useCode()) {
            try {
                DB::insert('ssys22_users', $user->postData);
                $res->status = 200;
                $res->success = true;
                $res->objects = $user->createResponse();
            } catch (Exception) {
                array_push($res->errors, "database error");
            }
        } else array_push($res->errors, "failed to add code");
    } else array_push($res->errors, "Attendance full!");
}
http_response_code($res->status);
echo json_encode($res);