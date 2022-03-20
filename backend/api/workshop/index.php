<?php
header('Access-Control-Allow-Origin: *'); //dev allow localhost cors
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: POST, PUT, GET, DELETE");

switch ($_SERVER['REQUEST_METHOD']) {
    case "GET":
        require __DIR__ . "/getWorkshop.php";
        break;
    default:
        echo "What Request Method is this???";
}