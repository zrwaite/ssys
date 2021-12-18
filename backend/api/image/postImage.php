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
$email = getBody("email");
if (!$email) array_push($res->errors, "Must include email");
else if (!checkEmail($email)) array_push($res->errors, "Invalid email");

$image = $_FILES["image"];
$filePath = false;
$fileName = false;
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
            $result = DB::queryFirstRow("SELECT id FROM ssys22_students WHERE email=%s LIMIT 1", $email);
            if ($result) {
                DB::update('ssys22_students', ["image_link" => $fileName], "email=%s", $email);
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