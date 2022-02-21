<?php
assert($_SERVER['REQUEST_METHOD'] == "DELETE");

use Symfony\Component\Dotenv\Dotenv;

require_once __DIR__ . "/../../vendor/autoload.php";
require_once __DIR__ . "/../../models/response.php";
require_once __DIR__ . "/../../modules/database.php"; //Connect to database
require_once __DIR__ . "/../../modules/readParams.php";
require_once __DIR__ . "/../../models/user.php";
require_once __DIR__ . "/../../modules/checkers.php";

$dotenv = new Dotenv();
$dotenv->load(__DIR__ . "/../../modules/env/.env");

$res = new Response();
$res->request_type = "DELETE";
$user = new DeleteUser();

$email = getBody("email");
if (is_null($email)) array_push($res->errors, "missing email");
$password = getBody("password");
if (is_null($password)) array_push($res->errors, "missing password");

if (count($res->errors) == 0) {
    $res->status = validatePassword($password, $email);
    if ($res->status == 200) {
        $user->removeUser();
        DB::delete('ssys22_users', 'email=%s', $email);
        $res->objects = "deleted";
        $res->success = true;
    } else if ($res->status == 400) array_push($res->errors, "incorrect password");
    else if ($res->status == 404) array_push($res->errors, "account not found");
}

http_response_code($res->status);
echo json_encode($res);