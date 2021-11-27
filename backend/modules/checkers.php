<?php
function checkEmail(string $email):bool {
	if (filter_var($email, FILTER_VALIDATE_EMAIL)) return true;
	else return false;
}
function checkPassword(string $password): array{
	$errors = array();
	if (strlen($password)<8) array_push($errors, "password too short");
	if (!preg_match('/[a-z]/', $password)) array_push($errors, "password must contain lower-case letter");
	if (!preg_match('/[A-Z]/', $password)) array_push($errors, "password must contain upper-case letter");
	if (!preg_match('/\d/', $password)) array_push($errors, "password must contain number");
	if (!preg_match('/[^a-zA-Z\d]/', $password)) array_push($errors, "password must contain special character");
	return ($errors);
}
?>