<?php

use Symfony\Component\Dotenv\Dotenv;

if (file_exists(__DIR__."/../../vendor/autoload.php")
&& file_exists(__DIR__."/../../modules/database.php")
&& file_exists(__DIR__."/../../modules/env/.env")
&& file_exists(__DIR__."/../../models/response.php")
&& file_exists(__DIR__."/../../models/student/getStudent.php")){
	//Imports
	require_once __DIR__."/../../vendor/autoload.php";
	require_once __DIR__."/../../models/response.php";
	require_once __DIR__."/../../modules/database.php"; //Connect to database
	require_once __DIR__."/../../models/student/getStudent.php";

	$dotenv = new Dotenv();
	$dotenv->load(__DIR__."/../../modules/env/.env");

	//Main
	#Object declaraion
	$res = new Response();

	if (count($res->errors)==0){
		$results = DB::query("SELECT fname, lname, email FROM ssys22_students");
		foreach ($results as $row) {
			echo "fname: " . $row['fname'] . "\n";
			echo "lname: " . $row['lname'] . "\n";
			echo "email: " . $row['email'] . "\n";
			echo "-------------\n";
		}
		$res->status = 200;
		$res->success = true;
	}
	echo json_encode($res);
} else {echo "Import error";}
?>

