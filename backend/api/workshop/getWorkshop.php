<?php

assert($_SERVER['REQUEST_METHOD'] == "GET");

use Symfony\Component\Dotenv\Dotenv;

//Imports
require_once __DIR__ . "/../../vendor/autoload.php";
require_once __DIR__ . "/../../models/response.php";
require_once __DIR__ . "/../../modules/readParams.php";
require_once __DIR__ . "/../../models/workshops.php";

$dotenv = new Dotenv();
$dotenv->load(__DIR__ . "/../../modules/env/.env");

//Main
$res = new Response();
$res->request_type = "GET";

$index = getQuery("index");
if (is_null($index)) {
	$res->objects = WORKSHOPS;
} else {
	if (intval($index) > count(WORKSHOPS) || intval($index) < 0) {
		$res->status = 404;
		array_push($res->errors, "index out of bounds");
	} else $res->objects = WORKSHOPS[intval($index)];
}
$res->status = 200;
$res->success = true;

http_response_code($res->status);
echo json_encode($res);

