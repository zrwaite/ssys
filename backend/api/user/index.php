<?php
header('Access-Control-Allow-Origin: *'); //dev allow localhost cors
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
header("Access-Control-Allow-Methods: POST, PUT, GET, DELETE");

switch ($_SERVER['REQUEST_METHOD']) {
    case "GET":
        require __DIR__ . "/getUser.php";
        break;
    case "POST":
        require __DIR__ . "/postUser.php";
        break;
    case "PUT":
        require __DIR__ . "/putUser.php";
        break;
    case "DELETE":
        require __DIR__ . "/deleteUser.php";
        break;
    default:
        echo "What Request Method is this???";
}