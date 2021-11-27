<?php

if (file_exists(__DIR__."/../vendor/autoload.php")
&& file_exists(__DIR__."/../models/response.php")
&& file_exists(__DIR__."/../modules/readParams.php")){
	//Imports
	require_once __DIR__."/../vendor/autoload.php";
	require_once __DIR__."/../models/response.php";
	require_once __DIR__."/../modules/readParams.php";

	//Main
	$res = new Response();
	// $var1 = getQuery("var1");
	// if(!$var1) array_push($res->errors, "missing var1");
	// $var2 = getBody("var2");
	// if(!$var2) array_push($res->errors, "missing var2");
	if (count($res->errors)==0){
		$res->status = 200;
		$res->success = true;
	}
	http_response_code($res->status);
	echo json_encode($res);
} else {echo "Import error";}
?>

