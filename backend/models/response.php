<?php
header('Content-Type:application/json; charset=utf-8');
ini_set('error_log', __DIR__."/../modules/logs/errors.txt");
class Response { //Class for json response 
    public bool $success;
    public int $status;
    public array $errors;
    public mixed $objects;
    public function __construct(){
        $this->success = false;
        $this->status = 400;
        $this->errors = array();
        $this->objects = array();
    }
}

?>