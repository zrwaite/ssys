<?php

class Response { //Class for json response 
    public $success;
    public $connected;
    public $errors;
    public $objects;
    public function __construct(){
        $this->success = false;
        $this->connected = false;
        $this->errors = array();
        $this->objects = array();
    }
}

?>