<?php
$requestType = $_SERVER['REQUEST_METHOD'];
switch ($requestType){
	case "GET":
		require __DIR__."/./getStudent.php";
		break;
	case "POST":
		require __DIR__."/./postStudent.php";
		break;
	case "PUT":
		require __DIR__."/./putStudent.php";
		break;
	case "DELETE":
		require __DIR__."/./deleteStudent.php";
		break;
}
?>