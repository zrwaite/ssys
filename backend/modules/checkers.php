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
    $result = DB::queryFirstRow("SELECT id, password_hash FROM ssys22_users WHERE email=%s LIMIT 1", $email);
    if ($result['id']) return (password_verify($password, $result['password_hash'])) ? 200 : 400;
    else return 404;
}

function usernameInUse(string $username): bool
{
    $result = DB::queryFirstRow("SELECT id FROM ssys22_users WHERE username=%s LIMIT 1", $username);
    if ($result['id']) return true;
    else return false;
}

function checkCode(string $code, bool $teacher): array
{
    $result = DB::queryFirstRow("SELECT id, used, teacher FROM ssys22_codes WHERE code=%s LIMIT 1", $code);
    if ($result["id"]) {
        if ($result["used"]) return ["Code has already been used"];
        else if ($result["teacher"] != $teacher) return ["Code not authorized for current teacher"];
        else return [];
    } else {
        return ["Invalid code"];
    }
}