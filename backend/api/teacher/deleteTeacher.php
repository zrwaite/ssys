<?php
//Imports
use Symfony\Component\Dotenv\Dotenv;

require_once __DIR__ . "/../../vendor/autoload.php";
require_once __DIR__ . "/../../models/response.php"; //Standardized response
require_once __DIR__ . "/../../modules/database.php"; //Connect to database
require_once __DIR__ . "/../../modules/readParams.php"; //Read body and query parameters as form data and json
require_once __DIR__ . "/../../models/teacher.php"; //Teacher api class

$dotenv = new Dotenv();
$dotenv->load(__DIR__ . "/../../modules/env/.env");

$res = new Response();
$res->request_type = "DELETE";
$teacher = new DeleteTeacher();

$email = getBody("email");
if (!$email) array_push($res->errors, "missing email");
$password = getBody("password");
if (!$password) array_push($res->errors, "missing password");

if (count($res->errors) == 0) {
    $res->status = validatePassword($password, $email);
    if ($res->status == 200) {
        $teacher->removeTeacher();
        DB::delete('ssys22_teachers', 'email=%s', $email);
        $res->objects = "deleted";
        $res->success = true;
    } else if ($res->status == 400) array_push($res->errors, "incorrect password");
    else if ($res->status == 404) array_push($res->errors, "account not found");
}

http_response_code($res->status);
echo json_encode($res);