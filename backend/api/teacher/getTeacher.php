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

//Main
#Object declaration
$res = new Response();
$res->request_type = "GET";
$teacher = new GetTeacher();
$email = getQuery("email");
if (!$email) array_push($res->errors, "missing email query");
if (count($res->errors) == 0) {
    $query = "id, fname, lname, email, email_confirmed, image_link, school ,shirt_size ,shirts_ordered ,city ,workshop_choices ,diet ,workshop_order ,video_link ,video_approved ,bio ,additional_info ,account_enabled, registrant_type";
    $result = DB::queryFirstRow("SELECT " . $query . " FROM ssys22_teachers WHERE email=%s LIMIT 1", $email);
    if ($teacher->parseResult($result)) {
        $res->status = 200;
        $res->success = true;
        $res->objects = $teacher;
    } else {
        $res->status = 404;
        array_push($res->errors, "teacher not found");
    }
}
http_response_code($res->status);
echo json_encode($res);