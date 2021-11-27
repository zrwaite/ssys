<?php

use Symfony\Component\Dotenv\Dotenv;

if (file_exists(__DIR__."/../vendor/autoload.php")
&& file_exists(__DIR__."/../modules/database.php")
&& file_exists(__DIR__."/../models/response.php")
&& file_exists(__DIR__."/../modules/readParams.php")
&& file_exists(__DIR__."/tokens.php")){
	//Imports
	require_once __DIR__."/../vendor/autoload.php";
	require_once __DIR__."/../models/response.php";
	require_once __DIR__."/../modules/database.php"; //Connect to database
	require_once __DIR__."/../modules/readParams.php";
	require_once __DIR__."/tokens.php";

	//Main
	#Object declaraion
	$res = new Response();

	$email = getQuery("email");
	$code = getBody("confirmation_code");
	if(!$email) array_push($res->errors, "missing email query");
	if(!$code) array_push($res->errors, "missing confirmation_code in body");
	if (count($res->errors)==0){
		$query = "id, confirmation_code";
		$teacherResult = DB::queryFirstRow("SELECT ".$query." FROM ssys22_teachers WHERE email=%sLIMIT 1", $email);
		$studentResult = DB::queryFirstRow("SELECT ".$query." FROM ssys22_students WHERE email=%sLIMIT 1", $email);
		$success = false;
		if (boolval($teacherResult['id'])) {
			if ($teacherResult['confirmation_code']==$code){
				$puts = array();
				$puts['email_confirmed'] = true;
				DB::update('ssys22_teachers', $puts, "email=%s", $email);
				$success = true;
			} else {
				$success = false;
				array_push($res->errors, "incorrect code");
			}
		} else if (boolval($studentResult['id'])){
			if ($studentResult['confirmation_code']==$code){
				$puts = array();
				$puts['email_confirmed'] = true;
				DB::update('ssys22_students', $puts, "email=%s", $email);
				$success = true;
			} else {
				$success = false;
				array_push($res->errors, "incorrect code");
			}
		} else {
			$res->status = 404;
			array_push($res->errors, "account not found");
		}
		if ($success) {
			$res->status = 200;
			$res->success = true;
		} else {
			array_push($res->errors, "confirmation failed");
		}
	}
	echo json_encode($res);
} else {echo "Import error";}
?>