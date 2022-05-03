<?php
header('Access-Control-Allow-Origin: *'); //dev allow localhost cors
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
header("Access-Control-Allow-Methods: POST, PUT, GET, DELETE");
switch ($_SERVER['REQUEST_METHOD']) {
    case "POST":
        require __DIR__ . "/postImage.php";
        break;
    case "DELETE":
        require __DIR__ . "/deleteImage.php";
        break;
}