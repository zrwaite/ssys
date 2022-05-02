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

$username = getQuery("username");
if (is_null($username)) array_push($res->errors, "Missing username query, or did you mean for a non-GET request?");

if (count($res->errors) == 0) {
    $tokenData = validateToken($username);
    $query = "id, fname, lname, username, grade, image_link, image_approved ,school ,city ,workshop_choices ,instagram ,diet ,workshop_order ,bio ,additional_info ,emergency_contact ,account_enabled, public, teacher";
    $result = DB::queryFirstRow("SELECT " . $query . " FROM ssys22_users WHERE username=%s", $username);
    $parsedResult = $user->getParseResult($result);
//    var_dump($parsedResult);
    if ($parsedResult) {
        if ($parsedResult['public'] || $tokenData->success || true) {
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

