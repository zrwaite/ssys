<?php
//Imports
require_once __DIR__ . "/../vendor/autoload.php";
require_once __DIR__ . "/../models/response.php";
require_once __DIR__ . "/../modules/readParams.php";
require_once __DIR__ . "/../modules/checkers.php";
require_once __DIR__ . "/tokens.php";

//Main
$res = new Response();

$email = getBody("email");
$password = getBody("password");
if (!$email) array_push($res->errors, "missing email query");
if (!$password) array_push($res->errors, "missing password query");
if (count($res->errors) == 0) {
    $res->status = validatePassword($password, $email); //Validate password, get response status
    if ($res->status == 200) {
        $tokenBody = new tokenBody($email);
        $token = createToken($tokenBody);
        $res->status = 200;
        $res->success = true;
        $res->objects = $token;
    } else if ($res->status == 404) array_push($res->errors, "account not found");
    else array_push($res->errors, "signin failed");
}
http_response_code($res->status);
echo json_encode($res);