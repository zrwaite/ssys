<?php

assert($_SERVER['REQUEST_METHOD'] == "POST");

use Symfony\Component\Dotenv\Dotenv;

//Imports
require_once __DIR__ . "/../../vendor/autoload.php";
require_once __DIR__ . "/../../models/response.php";
require_once __DIR__ . "/../../modules/database.php"; //Connect to database
require_once __DIR__ . "/../../modules/readParams.php";
require_once __DIR__ . "/../../modules/generateData.php";


$dotenv = new Dotenv();
$dotenv->load(__DIR__ . "/../../modules/env/.env");
//Main
//Object declaraion
$res = new Response();
$res->request_type = "POST";

$type = getBody("type");
$password = getBody("password");
$numCodes = getBody("num_codes");

if (is_null($type)) array_push($res->errors, "missing type");
if (is_null($password)) array_push($res->errors, "missing password");
else if ($password != $_ENV['CODE_PASSWORD']) array_push($res->errors, "incorrect password");
if (!count($res->errors)) {
    if ($type == "teacher") {
        $newCode = generateAccessCode();
        try {
            DB::insert('ssys22_codes', array(
                'type' => "teacher",
                'code' => $newCode,
            ));
            $res->objects = $newCode;
            $res->success = true;
            $res->status = 201;
        } catch (Exception) {
            array_push($res->errors, "database error");
        }
    } else if ($type == "student") {
        if (is_null($numCodes)) array_push($res->errors, "missing num_codes");
        else if (!is_int($numCodes)) array_push($res->errors, "invalid num_codes");
        else {
            $newCodes = array();
            for ($i = 0; $i < $numCodes; $i++) {
                $newCode = generateAccessCode();
                try {
                    DB::insert('ssys22_codes', array(
                        'type' => "student",
                        'code' => $newCode,
                    ));
                    array_push($newCodes, $newCode);
                } catch (Exception) {
                    array_push($res->errors, "database error");
                }
            }
            if (!count($res->errors)) {
                $res->objects = $newCodes;
                $res->success = true;
                $res->status = 201;
            }
        }
    } else array_push($res->errors, "invalid type");
}

http_response_code($res->status);
echo json_encode($res);