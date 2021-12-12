<?php
header('Content-Type:application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *'); //dev allow localhost cors
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
ini_set('error_log', __DIR__ . "/../modules/logs/errors.txt");

class Response
{ //Class for json response
    public bool $success;
    public int $status;
    public array $errors;
    public mixed $objects;
    public string|null $request_type;

    public function __construct()
    {
        $this->success = false;
        $this->status = 400;
        $this->errors = array();
        $this->objects = array();
        $this->request_type = $_SERVER['REQUEST_METHOD'];
    }
}