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
	$res = new Response();

	#get post queries
	$email = getBody("email");
	if(!$email) array_push($res->errors, "Must include email");
	else {
		$params = ["fname", "lname", "teacher_email", "teacher_id", "password", "grade", "image_link" ,"school", "shirt_size", "shirts_ordered", "city", "workshop_choices", "instagram", "diet", "workshop_order", "video_link", "bio", "additional_info", "emergency_contact", "account_enabled", "registration_type"];
		$puts = array();
		for ($i=0; $i<count($params); $i++){
			$param = getBody($params[$i]);
			if ($param) $puts[$params[$i]] = $param;
		}
		if (count($puts)==0) array_push($res->errors, "You didn't send anything to update");
	}
	if (count($res->errors)==0){
		try {
			$result = DB::queryFirstRow("SELECT id FROM ssys22_students WHERE email=%s LIMIT 1", $email);
			if ($result){
				DB::update('ssys22_students', $puts, "email=%s", $email);
				$res->status = 200;
				$res->success = true;
			} else {
				$res->status = 404;
				array_push($res->errors, "Can not find student");
			}
		} catch (Exception $e) {
			echo 'Message: ' .$e->getMessage();
		}
	}
	echo json_encode($res);
} else {echo "Import error";}
?>