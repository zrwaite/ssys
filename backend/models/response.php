<?php
header('Content-Type:application/json; charset=utf-8');
class Response { //Class for json response 
    public bool $success;
    public int $status;
    public array $errors;
    public object $objects;
    public function __construct(){
        $this->success = false;
        $this->status = 400;
        $this->errors = array();
        $this->objects = array();
    }
}

?>