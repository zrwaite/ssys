<?php

class ErrorsString
{
    public array $errors = array();
    public string $response = "";
}

class ErrorsObject
{
    public array $errors = array();
    public $response;
}

class ErrorsBool
{
    public array $errors = array();
    public bool $success = false;
}