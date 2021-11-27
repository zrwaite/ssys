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
	#Object declaraion
	$res = new Response();
	$teacher = new GetTeacher();
	$email = getQuery("email");
	if(!$email) array_push($res->errors, "missing email query");
	if (count($res->errors)==0){
		$query = "id, fname, lname, email, email_confirmed, image_link, school ,shirt_size ,shirts_ordered ,city ,workshop_choices ,diet ,workshop_order ,video_link ,video_approved ,bio ,additional_info ,account_enabled";
		$result = DB::queryFirstRow("SELECT ".$query." FROM ssys22_teachers WHERE email=%s LIMIT 1", $email);
		if($teacher->parseResult($result)){
			$res->status = 200;
			$res->success = true;
			$res->objects = $teacher;
		} else {
			$res->status = 404;
			array_push($res->errors, "teacher not found");
		}
	}
	http_response_code($res->status);
	echo json_encode($res);
} else {echo "Import error";}
?>

