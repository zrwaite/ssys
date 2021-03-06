<?php
header('Access-Control-Allow-Origin: *'); //dev allow localhost cors
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
header("Access-Control-Allow-Methods: POST, PUT, GET, DELETE");

require_once __DIR__ . "/../modules/readParams.php";
$type = getBody("type");

switch ($type) {
    case "signIn":
        require __DIR__ . "/signin.php";
        break;
    default:
        echo "Invalid type";
}
