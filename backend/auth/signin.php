<?php
assert($_SERVER['REQUEST_METHOD'] == "POST");

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
if (is_null($email)) array_push($res->errors, "missing email query");
if (is_null($password)) array_push($res->errors, "missing password query");
if (count($res->errors) == 0) {
    $result = DB::queryFirstRow("SELECT user_type, id, password_hash FROM ssys22_users WHERE email=%s LIMIT 1", $email);
    if ($result['id']) $res->status = (password_verify($password, $result['password_hash'])) ? 200 : 400;
    else $res->status = 404;
    if ($res->status == 200) {
        $tokenBody = new tokenBody($email);
        $token = createToken($tokenBody);
        $res->status = 200;
        $res->success = true;
        $res->objects = ["token" => $token, "user_type" => $result['user_type']];
    } else if ($res->status == 404) array_push($res->errors, "account not found");
    else array_push($res->errors, "signin failed");
}
http_response_code($res->status);
echo json_encode($res);