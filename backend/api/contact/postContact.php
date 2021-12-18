<?php
assert($_SERVER['REQUEST_METHOD'] == "POST");

use Symfony\Component\Dotenv\Dotenv;


//Imports
require_once __DIR__ . "/../../vendor/autoload.php";
require_once __DIR__ . "/../../models/response.php";
//require_once __DIR__ . "/../../modules/database.php"; //Connect to database
require_once __DIR__ . "/../../modules/readParams.php";
require_once __DIR__ . "/../../modules/checkers.php";
require_once __DIR__ . "/../../modules/mailer.php";

$dotenv = new Dotenv();
$dotenv->load(__DIR__ . "/../../modules/env/.env");

//Object declaraion
$res = new Response();
$res->request_type = "POST";

$fromEmail = getBody("email");
$message = getBody("message");
$to = getBody("to");
if (!$fromEmail) array_push($res->errors, "missing email");
else if (!checkEmail($fromEmail)) array_push($res->errors, "Invalid email");
if (!$message) array_push($res->errors, "missing message");
if (!$to) array_push($res->errors, "missing to");
$toEmail = "";
switch ($to) {
    case "organizer":
        $toEmail = "weiqixu2005@sustainableorillia.ca";
        break;
    case "tech":
        $toEmail = "zacwaite@sustainableorillia.ca";
        break;
    default:
        array_push($res->errors, "invalid to");
}
if (count($res->errors) == 0) {
    $mailText = "Message from Sustainable Simcoe Youth Conference Contact form:
                " . $message;
    $mailHtml = "<h1>Message from Sustainable Simcoe Youth Conference Contact form:</h1>
                <p>" . $message . "</p>";
    receiveMail($toEmail, $fromEmail, $mailHtml, $mailText);
    $res->status = 200;
    $res->success = true;
}

http_response_code($res->status);
echo json_encode($res);