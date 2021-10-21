<?php
$requestType = $_SERVER['REQUEST_METHOD'];
switch ($requestType){
	case "GET":
		require "./getStudent.php";
		break;
	case "POST":
		require "./postStudent.php";
		break;
	case "PUT":
		require "./putStudent.php";
		break;
	case "DELETE":
		require "./deleteStudent.php";
		break;
}
?>