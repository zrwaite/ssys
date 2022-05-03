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
$username = getBody("username");

$puts = array();
if (is_null($username)) array_push($res->errors, "Must include username");
try {
    $result = DB::queryFirstRow("SELECT id, teacher FROM ssys22_users WHERE username=%s LIMIT 1", $username);
} catch (Exception $e) {
    array_push($res->errors, 'Message: ' . $e->getMessage());
}
if ($result) {
    if (count($res->errors) == 0) {
        $user_puts_and_errors = $user->getPutArray($username);
        $res->errors = $user_puts_and_errors["errors"];
        $puts = $user_puts_and_errors["puts"];
        $tokenData = validateToken($username);
        if (!$tokenData->success) $res->errors = array_merge($res->errors, $tokenData->errors);
        if (count($res->errors) == 0) {
            if (count($puts) == 0) array_push($res->errors, "You didn't send anything to update ");
            else {
                try {
                    DB::update('ssys22_users', $puts, "username=%s", $username);
                    $res->objects = $puts;
                    $res->status = 200;
                    $res->success = true;
                } catch (Exception $e) {
                    array_push($res->errors, "Invalid input");
                }
            }
        }
    }
} else {
    $res->status = 404;
    array_push($res->errors, "Can not find user");
}


http_response_code($res->status);
echo json_encode($res);