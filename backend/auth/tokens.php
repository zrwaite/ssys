<?php
header('Access-Control-Allow-Origin: *'); //dev allow localhost cors
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: POST, PUT, GET, DELETE");

use Symfony\Component\Dotenv\Dotenv;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header('Content-Type:application/json; charset=utf-8');

//Imports
require_once __DIR__ . "/../vendor/autoload.php";
require_once __DIR__ . "/../models/structures.php";
$dotenv = new Dotenv();
$dotenv->load(__DIR__ . "/../modules/env/.env");

class tokenBody
{
    public string $username;

    function __construct($username)
    {
        $this->username = $username;
    }
}

function createToken($body): string
{
    $key = $_ENV['JWT_KEY'];
    return JWT::encode($body, $key);
}

function validateToken(string $username): ErrorsBool
{
    $result = new ErrorsBool();
    $tokenData = getTokenData();
    $result->errors = $tokenData->errors;
    if (!count($result->errors)) {
        if ($tokenData->response->username != $username) {
            array_push($result->errors, "Token not authorized for user");
        } else $result->success = true;
    }
    return $result;
}

function getTokenData(): ErrorsObject
{
    $result = new ErrorsObject();
    $auth = getallheaders()["Authorization"];
    $tokenSections = explode(" ", $auth);
    if (count($tokenSections) == 2) {
        $token = $tokenSections[1];
        $token = str_replace("\"", "", $token);
        try {
            $key = $_ENV['JWT_KEY'];
            $decoded = JWT::decode($token, new Key($key, 'HS256'));
            $result->response = $decoded;
        } catch (Exception $e) {
            array_push($result->errors, "Invalid Token");
        }
    } else {
        array_push($result->errors, "Invalid Authorization");
    }
    return $result;
}