<?php

use Symfony\Component\Dotenv\Dotenv;


if (file_exists(__DIR__."/../../vendor/autoload.php")
&& file_exists(__DIR__."/../../modules/database.php")
&& file_exists(__DIR__."/../../modules/env/.env")
&& file_exists(__DIR__."/../../models/response.php")
&& file_exists(__DIR__."/../../modules/readParams.php")
&& file_exists(__DIR__."/../../models/teacher.php")){
	//Imports
	require_once __DIR__."/../../vendor/autoload.php";
	require_once __DIR__."/../../models/response.php";
	require_once __DIR__."/../../modules/database.php"; //Connect to database
	require_once __DIR__."/../../modules/readParams.php";
	require_once __DIR__."/../../models/teacher.php";

	$dotenv = new Dotenv();
	$dotenv->load(__DIR__."/../../modules/env/.env");

	//Main
	//Object declaraion
	$res = new Response();
	$teacher = new PostTeacher();

	//get post queries
	$email = getBody("email");
	if(!$email) array_push($res->errors, "Must include email");
	else {
		$teacher->email = $email;
		$fname = getBody("fname");
		if ($fname) $teacher->fname = $fname;
		else array_push($res->errors, "Must include fname");
	
		$lname = getBody("lname");
		if ($lname) $teacher->lname = $lname;
		else array_push($res->errors, "Must include lname");

		$password = getBody("password");
		if ($password) $teacher->password = $password;
		else array_push($res->errors, "Must include password");
	}
	if (count($res->errors)==0){
		$teacher->createHash();
		try {
			$result = DB::queryFirstRow("SELECT id FROM ssys22_teachers WHERE email=%s LIMIT 1", $email);
			if (!$result){
				DB::insert('ssys22_teachers', array(
					'email' => $teacher->email,
					'fname' => $teacher->fname,
					'lname' => $teacher->lname,
					'password_hash' => $teacher->hash,
					'confirmation_code' => $teacher->confirmation_code
				));
				$res->status = 200;
				$res->success = true;
			} else {
				array_push($res->errors, "Email already in use");
			}
		} catch (Exception $e) {
			echo 'Message: ' .$e->getMessage();
		}
	}
	echo json_encode($res);
} else {echo "Import error";}
?>
