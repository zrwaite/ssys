<?php
//Imports
use JetBrains\PhpStorm\ArrayShape;

require_once __DIR__ . "/registrant.php";

class PostTeacher extends PostRegistrant
{ //Class for json response
    public function __construct()
    {
        parent::__construct(); //Post Registrant Constructor
    }
}

class PutTeacher extends PutRegistrant
{
    public array $teacher_params = [];

    #[ArrayShape(["errors" => "array", "puts" => "array"])] //dev array shape
    public function getPutArray($email): array
    {
        $errors = array(); //Stores errors
        $puts = array(); //Stores put array
//        for ($i = 0; $i < count($this->teacher_params); $i++) { //Go through each parameter unique to students
//            $current_param = $this->teacher_params[$i];
//            $error = false;
//            $param = getBody($current_param);
//            if (!$param) continue; //If the parameter isn't defined continue, otherwise check the switch for special cases
//            switch ($current_param) {
//                default:
//                    $error = true;
//                    array_push($errors, "Zac you forgot to implement the put switch for $current_param");
//                //TODO implement all put request switch cases
//            }
//            if (!$error) $puts[$current_param] = $param;
//        }
        $parent_errors_and_puts = parent::getPutArray($email);
        if (count($parent_errors_and_puts["errors"]) != 0) $errors = array_merge($errors, $parent_errors_and_puts["errors"]);
        if (count($parent_errors_and_puts["puts"]) != 0) $puts = array_merge($puts, $parent_errors_and_puts["puts"]);
        return [
            "errors" => $errors,
            "puts" => $puts,
        ];
    }
}

class GetTeacher extends GetRegistrant
{
//        public function parseResult(object|array $result): bool
//        {
//            return parent::parseResult($result);
//        }
}