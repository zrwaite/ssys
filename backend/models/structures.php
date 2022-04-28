<?php

class ErrorsString
{
    public array $errors = array();
    public string $response = "";
}

class ErrorsObject
{
    public array $errors = array();
    public mixed $response;
}

class ErrorsBool
{
    public array $errors = array();
    public bool $success = false;
}