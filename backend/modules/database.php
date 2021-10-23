<?php
//Allows for .env variables to be loaded in
require '../vendor/autoload.php';
$dotenv = new Symfony\Component\Dotenv\Dotenv();
$dotenv->load(__DIR__.'/env/.env');
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = mysqli_connect($_ENV['SERVER'], $_ENV['USERNAME'], $_ENV['PASSWORD'], $_ENV['DBNAME']); //Connect to database
?>