<?php
assert($_SERVER['REQUEST_METHOD'] == "DELETE");

use Symfony\Component\Dotenv\Dotenv;

require_once __DIR__ . "/../../vendor/autoload.php";
require_once __DIR__ . "/../../models/response.php";
require_once __DIR__ . "/../../modules/database.php"; //Connect to database
require_once __DIR__ . "/../../modules/readParams.php";
require_once __DIR__ . "/../../models/student.php";

$dotenv = new Dotenv();
$dotenv->load(__DIR__ . "/../../modules/env/.env");

$res = new Response();
$res->request_type = "DELETE";

$email = getQuery("email");

if (!$email) array_push($res->errors, "missing email query");
if (count($res->errors) == 0) {
    $result = DB::queryFirstRow("SELECT id FROM ssys22_students WHERE email=%s LIMIT 1", $email);
    //TODO implement delete request
}


echo "Zac hasn't implemented delete yet, deal with it";
