<?php

assert($_SERVER['REQUEST_METHOD'] == "POST");

use Symfony\Component\Dotenv\Dotenv;

//Imports
require_once __DIR__ . "/../../vendor/autoload.php";
require_once __DIR__ . "/../../models/response.php";
require_once __DIR__ . "/../../modules/database.php"; //Connect to database
require_once __DIR__ . "/../../modules/readParams.php";
require_once __DIR__ . "/../../modules/generateData.php";
require_once __DIR__ . "/../../auth/tokens.php";


$dotenv = new Dotenv();
$dotenv->load(__DIR__ . "/../../modules/env/.env");
//Main
//Object declaraion
$res = new Response();
$res->request_type = "POST";

$teacher = getBody("teacher");
$password = getBody("password");
$numCodes = getBody("num_codes");
$username = getBody("username");

if (is_null($teacher)) array_push($res->errors, "missing teacher");
else if (!is_bool($teacher)) array_push($res->errors, "invalid teacher");
if (!count($res->errors)) {
    if ($teacher) {
        $newCode = generateAccessCode();
        if (is_null($password)) array_push($res->errors, "missing password");
        else if ($password != $_ENV['CODE_PASSWORD']) array_push($res->errors, "incorrect password");
        else try {
            DB::insert('ssys22_codes', array(
                'teacher' => true,
                'code' => $newCode,
                "owner" => "You"
            ));
            $res->objects = $newCode;
            $res->success = true;
            $res->status = 201;
        } catch (Exception $exception) {
            array_push($res->errors, "database error");
        }
    } else {
        if (is_null($username)) array_push($res->errors, "missing username");
        else if (is_null($numCodes)) array_push($res->errors, "missing num_codes");
        else if (!is_numeric($numCodes)) array_push($res->errors, $numCodes);
        else {
            $tokenData = validateToken($username);
            if (!$tokenData->success) $res->errors = array_merge($res->errors, $tokenData->errors);
            else {
                $newCodes = array();
                for ($i = 0; $i < $numCodes; $i++) {
                    $newCode = generateAccessCode();
                    try {
                        DB::insert('ssys22_codes', array(
                            'teacher' => false,
                            'code' => $newCode,
                            'owner' => $username
                        ));
                        array_push($newCodes, $newCode);
                    } catch (Exception $exception) {
                        array_push($res->errors, "database error");
                    }
                }
            }
            if (!count($res->errors)) {
                $res->objects = $newCodes;
                $res->success = true;
                $res->status = 201;
            }
        }
    }
}

http_response_code($res->status);
echo json_encode($res);