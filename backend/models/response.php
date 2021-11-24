<?php
header('Content-Type:application/json; charset=utf-8');
class Response { //Class for json response 
    public $success;
    public $status;
    public $errors;
    public $objects;
    public function __construct(){
        $this->success = false;
        $this->status = 400;
        $this->errors = array();
        $this->objects = array();
    }
}

?>