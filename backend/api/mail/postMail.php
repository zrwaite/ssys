<?php
assert($_SERVER['REQUEST_METHOD'] == "POST");


//Imports
require_once __DIR__ . "/../../vendor/autoload.php";
require_once __DIR__ . "/../../models/response.php";
require_once __DIR__ . "/../../modules/readParams.php";
require_once __DIR__ . "/../../modules/checkers.php";
require_once __DIR__ . "/../../modules/mailModules.php";

//Main
//Object declaraion
$res = new Response();
$res->request_type = "POST";
//get post queries
$email = getBody("email");
if (!$email) array_push($res->errors, "Must include email");
else if (!validateEmail($email)) array_push($res->errors, "Invalid email");
$type = getBody("type");
if (!$type) array_push($res->errors, "Must include type");


if (count($res->errors) == 0) {
    switch ($type) {
        case "email_confirmed":
            $query = "ssys22_teachers.confirmation_code, ssys22_students.confirmation_code";
            $result = DB::queryFirstRow("SELECT " . $query . " FROM ssys22_teachers, ssys22_students WHERE ssys22_students.email=%s OR ssys22_students.email=%s LIMIT 1", $email, $email);
            $confirmation_code = $result["confirmation_code"];
            if (!emailConfirmation($confirmation_code, $email)) array_push($res->errors, "mail fail");
            break;
        default:
            array_push($res->errors, "invalid type");
    }
}
if (count($res->errors) == 0) {
    $res->status = 200;
    $res->success = true;
    $res->objects = "mail sent";
}
http_response_code($res->status);
echo json_encode($res);