<?php
require './modules/database.php';
require './modules/response.php';
$res = new Response;
// Check connection
if($conn->connect_error) {
	array_push($res->errors, $conn->connect_error);
	echo $res->errors;
} 
echo "Connected successfully";
$conn->close();
?>