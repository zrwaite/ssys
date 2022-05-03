<?php
assert($_SERVER['REQUEST_METHOD'] == "POST");

use Symfony\Component\Dotenv\Dotenv;

ini_set('file_uploads', "On");

//Imports
require_once __DIR__ . "/../../vendor/autoload.php";
require_once __DIR__ . "/../../models/response.php";
require_once __DIR__ . "/../../modules/database.php"; //Connect to database
require_once __DIR__ . "/../../modules/readParams.php";
require_once __DIR__ . "/../../modules/checkers.php";

$dotenv = new Dotenv();
$dotenv->load(__DIR__ . "/../../modules/env/.env");

//Object declaraion
$res = new Response();
$res->request_type = "POST";

$res->objects = json_decode(file_get_contents('php://input'), true);

//get post queries
$username = getBody("username");
if (is_null($username)) array_push($res->errors, "Must include email");

$image = $_FILES["image"];
$filePath = false;
$fileName = false;
$tokenData = validateToken($username);
if (!$tokenData->success) $res->errors = array_merge($res->errors, $tokenData->errors);
else {
    if ($image) {
        $fileName = basename($image["name"]); //Get the filename of the upload
        $fileType = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        $validFile = getimagesize($image["tmp_name"]);
        if (!$validFile) {
            array_push($res->errors, "invalid file");
            if ($image["size"] > 500000) array_push($res->errors, "image is too large");
            if ($fileType != "jpg" && $fileType != "png" && $fileType != "jpeg" && $fileType != "gif") array_push($res->errors, "only jpg, jpeg, png, gif");
        }
    } else array_push($res->errors, "image not found");
}

if (count($res->errors) == 0) {
    $filePath = __DIR__ . "/../../images/" . $fileName; // Get the file path on the server
    $index = 0;
    while (file_exists($filePath)) {
        $index++;
        $fileName = $index . "_" . $fileName;
        $filePath = __DIR__ . "/../../images/" . $fileName;
    }
    if (move_uploaded_file($_FILES["image"]["tmp_name"], $filePath)) {
        try {
            $result = DB::queryFirstRow("SELECT id FROM ssys22_users WHERE username=%s LIMIT 1", $username);
            if ($result) {
                DB::update('ssys22_users', ["image_link" => $fileName], "username=%s", $username);
                $res->status = 200;
                $res->success = true;
                $res->objects = $fileName;
            } else {
                $res->status = 404;
                array_push($res->errors, "Can not find student");
            }
        } catch (Exception $e) {
            echo 'Message: ' . $e->getMessage();
        }
    } else array_push($res->errors, "File didn't move");
} else array_push($res->errors, "invalid file");


http_response_code($res->status);
echo json_encode($res);