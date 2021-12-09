<?php

assert($_SERVER['REQUEST_METHOD'] == "POST");

use Symfony\Component\Dotenv\Dotenv;

//Imports
require_once __DIR__ . "/../../vendor/autoload.php";
require_once __DIR__ . "/../../models/response.php";
require_once __DIR__ . "/../../modules/database.php"; //Connect to database
require_once __DIR__ . "/../../modules/readParams.php";
require_once __DIR__ . "/../../models/student.php";

$dotenv = new Dotenv();
$dotenv->load(__DIR__ . "/../../modules/env/.env");

//Main
//Object declaraion
$res = new Response();
$res->request_type = "POST";

$student = new PostStudent();
$res->objects = json_decode(file_get_contents('php://input'), true);
//get post queries
$email = getBody("email");
if ($email) {
	$student->email = $email;
	if (!$student->checkEmail()) array_push($res->errors, "Invalid email");
} else array_push($res->errors, "Must include email");

$registrant_type = getBody("registration_type");
if ($registrant_type) $student->registrant_type = $registrant_type;
else array_push($res->errors, "Must include registrant_type");

if (count($res->errors) == 0) {
	$fname = getBody("fname");
	$lname = getBody("lname");
	$password = getBody("password");
	switch ($registrant_type) {
		case "individual":
			if ($fname) $student->fname = $fname;
			else array_push($res->errors, "Must include fname");

			if ($lname) $student->lname = $lname;
			else array_push($res->errors, "Must include lname");

			if ($password) $student->password = $password;
			else array_push($res->errors, "Must include password");
			$res->errors = array_merge($res->errors, $student->checkPassword());
			$student->password_set = true;

			break;
		case "student":
			if ($fname) $student->fname = $fname;
			if ($lname) $student->lname = $lname;

			if ($password) $student->password = $password;
			else $student->createPassword();

			$teacher_email = getBody("teacher_email");
			if ($teacher_email) $student->teacher_email = $teacher_email;
			else array_push($res->errors, "Must include teacher_email");

			$teacher_id = getBody("teacher_id");
			if($teacher_id) $student->teacher_id = $teacher_id;
			else array_push($res->errors, "Must include teacher_id");

			break;
		default:
			array_push($res->errors, "registration_type must be individual or student");
			break;
	}
}
if (count($res->errors)==0){
	$student->createHash();
	try {
		$result = DB::queryFirstRow("SELECT id FROM ssys22_students WHERE email=%s LIMIT 1", $email);
		if (!$result){
			DB::insert('ssys22_students', array(
				'email' => $student->email,
				'fname' => $student->fname,
				'lname' => $student->lname,
				'password_hash' => $student->hash,
				'teacher_email' => $student->teacher_email,
				'teacher_id' => $student->teacher_id,
				'confirmation_code' => $student->confirmation_code,
				'registrant_type' => $student->registrant_type //TODO change name of registration type in sql
			));
			$res->status = 200;
			$res->success = true;
			//send email with link to confirm email page with confirmation_code
		} else {
			array_push($res->errors, "Email already in use");
		}
	} catch (Exception $e) {
		echo 'Message: ' .$e->getMessage();
	}
}
http_response_code($res->status);
echo json_encode($res);