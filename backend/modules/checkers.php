<?php
require_once __DIR__ . "/database.php";

function checkEmail(string $email): bool
{
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) return true;
    else return false;
}

function checkPassword(string $password): array
{
    $errors = array();
    if (strlen($password) < 8) array_push($errors, "password too short");
    if (!preg_match('/[a-z]/', $password)) array_push($errors, "password must contain lower-case letter");
    if (!preg_match('/[A-Z]/', $password)) array_push($errors, "password must contain upper-case letter");
    if (!preg_match('/\d/', $password)) array_push($errors, "password must contain number");
    if (!preg_match('/[^a-zA-Z\d]/', $password)) array_push($errors, "password must contain special character");
    return ($errors);
}

function validatePassword(string $password, string $email): int
{
    $query = "ssys22_teachers.id, ssys22_teachers.password_hash, ssys22_students.id, ssys22_students.password_hash";
    $result = DB::queryFirstRow("SELECT " . $query . " FROM ssys22_teachers, ssys22_students WHERE ssys22_students.email=%s OR ssys22_students.email=%s LIMIT 1", $email, $email);
    if ($result['id']) return (password_verify($password, $result['password_hash'])) ? 200 : 400;
    else return 404;
}

function validateEmail(string $email): bool
{
    $query = "ssys22_teachers.id, ssys22_students.id";
    $result = DB::queryFirstRow("SELECT " . $query . " FROM ssys22_teachers, ssys22_students WHERE ssys22_students.email=%s OR ssys22_students.email=%s LIMIT 1", $email, $email);
    if ($result['id']) return true;
    else return false;
}
