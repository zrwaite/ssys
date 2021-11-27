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
	//Object declaraion
	$res = new Response();
	$student = new PostStudent();

	//get post queries
	$email = getBody("email");
	if($email) $student->email = $email;
	else array_push($res->errors, "Must include email");
	if(!$student->checkEmail()) array_push($res->errors, "Invalid email");

	$registration_type = getBody("registration_type");
	if ($registration_type) $student->registration_type = $registration_type;
	else array_push($res->errors, "Must include registration type");
	
	if (count($res->errors)==0){
		switch ($registration_type) {
			case "individual":
				$fname = getBody("fname");
				if ($fname) $student->fname = $fname;
				else array_push($res->errors, "Must include fname");
			
				$lname = getBody("lname");
				if ($lname) $student->lname = $lname;
				else array_push($res->errors, "Must include lname");

				$password = getBody("password");
				if ($password) $student->password = $password;
				else array_push($res->errors, "Must include password");
				$res->errors = array_merge($res->errors, $student->checkPassword());

				$student->teacher_email = null;
				$student->teacher_id = null;

				break;
			case "student":
				$fname = getBody("fname");
				if ($fname) $student->fname = $fname;
				else $student->fname = "Person";
			
				$lname = getBody("lname");
				if ($lname) $student->lname = $lname;
				else $student->lname = "Smith";

				$password = getBody("password");
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
					'registration_type' => $student->registration_type
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
	echo json_encode($res);
} else {echo "Import error";}
?>
