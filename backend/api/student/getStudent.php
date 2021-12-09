<?php

assert($_SERVER['REQUEST_METHOD']=="GET");
use Symfony\Component\Dotenv\Dotenv;

//Imports
require_once __DIR__."/../../vendor/autoload.php";
require_once __DIR__."/../../models/response.php";
require_once __DIR__."/../../modules/database.php"; //Connect to database
require_once __DIR__."/../../modules/readParams.php";
require_once __DIR__ . "/../../models/student.php";

$dotenv = new Dotenv();
$dotenv->load(__DIR__ . "/../../modules/env/.env");

//Main
$res = new Response();
$res->request_type = "GET";
$student = new GetStudent();
$email = getQuery("email");
if (!$email) array_push($res->errors, "Missing email query, or did you mean for a non-GET request?");
if (count($res->errors) == 0) {
	$query = "id, fname, lname, email, email_confirmed, teacher_email, teacher_id, password_set, grade, image_link, image_approved ,school ,shirt_size ,shirts_ordered ,city ,workshop_choices ,instagram ,diet ,workshop_order ,video_link ,video_approved ,bio ,additional_info ,emergency_contact ,account_enabled";
	$result = DB::queryFirstRow("SELECT " . $query . " FROM ssys22_students WHERE email=%s LIMIT 1", $email);
	if ($student->parseResult($result)) {
		$res->status = 200;
		$res->success = true;
		$res->objects = $student;
	} else {
		$res->status = 404;
		array_push($res->errors, "Student not found");
	}
}
http_response_code($res->status);
echo json_encode($res);

