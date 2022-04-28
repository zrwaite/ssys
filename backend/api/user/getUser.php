<?php

assert($_SERVER['REQUEST_METHOD'] == "GET");

use Symfony\Component\Dotenv\Dotenv;

//Imports
require_once __DIR__ . "/../../vendor/autoload.php";
require_once __DIR__ . "/../../models/response.php";
require_once __DIR__ . "/../../modules/database.php"; //Connect to database
require_once __DIR__ . "/../../modules/readParams.php";
require_once __DIR__ . "/../../models/user.php";
require_once __DIR__ . "/../../auth/tokens.php";

$dotenv = new Dotenv();
$dotenv->load(__DIR__ . "/../../modules/env/.env");

//Main
$res = new Response();
$res->request_type = "GET";
$user = new GetUser();

$email = getQuery("email");
if (is_null($email)) array_push($res->errors, "Missing email query, or did you mean for a non-GET request?");

if (count($res->errors) == 0) {
    $tokenData = validateToken($email);
    $query = "id, fname, lname, email, email_confirmed, teacher_email, teacher_id, password_set, grade, image_link, image_approved ,school ,shirt_size ,shirts_ordered ,city ,workshop_choices ,instagram ,diet ,workshop_order ,video_link ,video_approved ,bio ,additional_info ,emergency_contact ,account_enabled, public, user_type";
    $result = DB::queryFirstRow("SELECT " . $query . " FROM ssys22_users WHERE email=%s", $email);
    $parsedResult = $user->getParseResult($result);
    if ($parsedResult) {
        if ($parsedResult['public'] || $tokenData->success) {
            $res->status = 200;
            $res->success = true;
            $res->objects = $parsedResult;
        } else {
            $res->errors = array_merge($res->errors, $tokenData->errors);
        }
    } else {
        $res->status = 404;
        array_push($res->errors, "User not found");
    }
}
http_response_code($res->status);
echo json_encode($res);

