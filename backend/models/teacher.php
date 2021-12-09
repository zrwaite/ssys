<?php
//Imports
require_once __DIR__ . "/registrant.php";

class PostTeacher extends PostRegistrant
{ //Class for json response
    public function __construct()
    {
        parent::__construct(); //Post Registrant Constructor
    }
}

class GetTeacher extends GetRegistrant
{
//        public function parseResult(object|array $result): bool
//        {
//            return parent::parseResult($result);
//        }
}