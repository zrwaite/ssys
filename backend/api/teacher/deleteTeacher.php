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

echo "Zac hasn't implemented delete yet, deal with it";
//Main
#Object declaraion
$res = new Response();
$res->request_type = "DELETE";
