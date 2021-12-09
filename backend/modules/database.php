<?php

use Symfony\Component\Dotenv\Dotenv;

//Imports
require_once __DIR__ . "/../vendor/autoload.php";
require_once __DIR__ . '/meekrodb-2.4/db.class.php';
$dotenv = new Dotenv();
$dotenv->load(__DIR__ . '/env/.env');

//Main
DB::$logfile = __DIR__ . "/../modules/logs/database.txt";
DB::$user = $_ENV['USERNAME'];
DB::$password = $_ENV['PASSWORD'];
DB::$dbName = $_ENV['DBNAME'];