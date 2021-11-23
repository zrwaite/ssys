<?php

use Symfony\Component\Dotenv\Dotenv;


if (file_exists(__DIR__."/../../vendor/autoload.php")
&& file_exists(__DIR__."/../../modules/database.php")
&& file_exists(__DIR__."/../../modules/env/.env")
&& file_exists(__DIR__."/../../models/response.php")
&& file_exists(__DIR__."/../../models/student/postStudent.php")){
	//Imports
	require_once __DIR__."/../../vendor/autoload.php";
	require_once __DIR__."/../../models/response.php";
	require_once __DIR__."/../../modules/database.php"; //Connect to database
	require_once __DIR__."/../../models/student/postStudent.php";

	$dotenv = new Dotenv();
	$dotenv->load(__DIR__."/../../modules/env/.env");

	//Main
	#Object declaraion
	$res = new Response();
	$student = new PostStudent();

	#get post queries
	$email = getPost("email");
	if($email) $student->email = $email;
	else array_push($res->errors, "Must include email");

	$fname = getPost("fname");
	if ($fname) $student->fname = $fname;
	else $student->fname = "Person";

	$lname = getPost("lname");
	if ($lname) $student->lname = $lname;
	else $student->lname = "Smith";

	$password = getPost("password");
	if ($password) $student->password = $password;
	else $student->createPassword();

	$teacher_email = getPost("teacher_email");
	if ($teacher_email) $student->teacher_email = $teacher_email;
	else $student->teacher_email = null;

	$teacher_id = getPost("teacher_id");
	if($teacher_id) $student->teacher_id = $teacher_id;
	else $student->teacher_id = null;

	if (count($res->errors)==0){
		$student->createHash();
		// DB::insert('ssys22_students', array(
		// 	'email' => $student->email,
		// 	'fname' => $student->fname,
		// 	'lname' => $student->lname,
		// 	'password_hash' => $student->hash,
		// 	'teacher_email' => $student->teacher_email,
		// 	'teacher_id' => $student->teacher_id
		// ));
		// $res->status = 200;
		// $res->success = true;
	}
	echo json_encode($student);
	echo json_encode($res);
} else {echo "Import error";}
?>
