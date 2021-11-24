<?php

use Symfony\Component\Dotenv\Dotenv;

if (file_exists(__DIR__."/../../vendor/autoload.php")
&& file_exists(__DIR__."/../../modules/database.php")
&& file_exists(__DIR__."/../../modules/env/.env")
&& file_exists(__DIR__."/../../models/response.php")
&& file_exists(__DIR__."/../../modules/readParams.php")
&& file_exists(__DIR__."/../../models/student.php")){
	//Imports
	require_once __DIR__."/../../vendor/autoload.php";
	require_once __DIR__."/../../models/response.php";
	require_once __DIR__."/../../modules/database.php"; //Connect to database
	require_once __DIR__."/../../modules/readParams.php";
	require_once __DIR__."/../../models/student.php";

	$dotenv = new Dotenv();
	$dotenv->load(__DIR__."/../../modules/env/.env");

	//Main
	#Object declaraion
	$res = new Response();
	$student = new GetStudent();
	$email = getQuery("email");
	if(!$email) array_push($res->errors, "missing email query");
	if (count($res->errors)==0){
		$result = DB::queryFirstRow("SELECT id, fname, lname, email FROM ssys22_students WHERE email=%s LIMIT 1", $email);
		$student->id = $result['id'];
		$student->fname = $result['fname'];
		$student->lname = $result['lname'];
		$student->email = $result['email'];
		$res->status = 200;
		$res->success = true;
		$res->objects = $student;
	}
	echo json_encode($res);
} else {echo "Import error";}
?>

