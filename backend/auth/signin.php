<?php
assert($_SERVER['REQUEST_METHOD'] == "POST");

//Imports
require_once __DIR__ . "/../vendor/autoload.php";
require_once __DIR__ . "/../models/response.php";
require_once __DIR__ . "/../modules/readParams.php";
require_once __DIR__ . "/../modules/checkers.php";
require_once __DIR__ . "/tokens.php";

//Main
$res = new Response();

$email = getBody("email");
$password = getBody("password");
if (!$email) array_push($res->errors, "missing email query");
if (!$password) array_push($res->errors, "missing password query");
if (count($res->errors) == 0) {
    $query = "ssys22_teachers.registrant_type, ssys22_students.registrant_type, ssys22_teachers.id, ssys22_teachers.password_hash, ssys22_students.id, ssys22_students.password_hash";
    $result = DB::queryFirstRow("SELECT " . $query . " FROM ssys22_teachers, ssys22_students WHERE ssys22_students.email=%s OR ssys22_students.email=%s LIMIT 1", $email, $email);
    if ($result['id']) $res->status = (password_verify($password, $result['password_hash'])) ? 200 : 400;
    else $res->status = 404;

    if ($res->status == 200) {
        $tokenBody = new tokenBody($email);
        $token = createToken($tokenBody);
        $res->status = 200;
        $res->success = true;
        $res->objects = ["token" => $token, "registrant_type" => $result['registrant_type']];
    } else if ($res->status == 404) array_push($res->errors, "account not found");
    else array_push($res->errors, "signin failed");
}
http_response_code($res->status);
echo json_encode($res);