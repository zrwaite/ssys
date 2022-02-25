<?php

assert($_SERVER['REQUEST_METHOD'] == "PUT");

//Imports
require_once __DIR__ . "/../../vendor/autoload.php";
require_once __DIR__ . "/../../models/response.php";
require_once __DIR__ . "/../../modules/database.php"; //Connect to database
require_once __DIR__ . "/../../modules/readParams.php";
require_once __DIR__ . "/../../models/user.php";
require_once __DIR__ . "/../../modules/checkers.php";

//Main
$res = new Response();
$res->request_type = "PUT";
$user = new PutUser();
//get post queries
$email = getBody("email");

$puts = array();
if (is_null($email)) array_push($res->errors, "Must include email");
try {
    $result = DB::queryFirstRow("SELECT id, user_type FROM ssys22_users WHERE email=%s LIMIT 1", $email);
} catch (Exception $e) {
    array_push($res->errors, 'Message: ' . $e->getMessage());
}
if ($result) {
    if (count($res->errors) == 0) {
        $user_puts_and_errors = $user->getPutArray($email, $result["user_type"]);
        $res->errors = $user_puts_and_errors["errors"];
        $puts = $user_puts_and_errors["puts"];
        if (count($res->errors) == 0) {
            if (count($puts) == 0) array_push($res->errors, "You didn't send anything to update ");
            else $res->objects = $puts;
        }
    }
    DB::update('ssys22_users', $puts, "email=%s", $email);
    $res->status = 200;
    $res->success = true;
} else {
    $res->status = 404;
    array_push($res->errors, "Can not find user");
}


http_response_code($res->status);
echo json_encode($res);