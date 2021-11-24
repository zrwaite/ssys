<?php
$requestType = $_SERVER['REQUEST_METHOD'];
switch ($requestType){
	case "GET":
		require __DIR__."/./getTeacher.php";
		break;
	case "POST":
		require __DIR__."/./postTeacher.php";
		break;
	case "PUT":
		require __DIR__."/./putTeacher.php";
		break;
	case "DELETE":
		require __DIR__."/./deleteTeacher.php";
		break;
}
?>