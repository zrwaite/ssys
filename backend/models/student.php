<?php

use JetBrains\PhpStorm\ArrayShape;

//dev array shape import

if (file_exists(__DIR__ . "/registrant.php")) {
    //Imports
    require_once __DIR__ . "/registrant.php";

    class PostStudent extends PostRegistrant
    { //Class for json response
        public string|null $teacher_email;
        public int|null $teacher_id;
        public bool $password_set;
        public string $registrant_type;

        public function __construct()
        {
            parent::__construct();
            $this->password_set = false;
            $this->teacher_email = null;
            $this->teacher_id = null;
            $this->fname = "Person";
            $this->lname = "Smith";
        }

        public function addStudent(): bool
        {
            if ($this->addAttendee()) {
                $settings = DB::queryFirstRow("SELECT id, num_students FROM ssys22_settings LIMIT 1");
                $numStudents = $settings['num_students'];
                $settingsId = $settings['id'];
                $puts = ['num_students' => $numStudents + 1];
                DB::update('ssys22_settings', $puts, "id=%s", $settingsId);
                return true;
            } else return false;
        }
    }

    class PutStudent extends PutRegistrant
    {
        public array $student_params = ["teacher_email", "teacher_id", "grade", "instagram", "emergency_contact"];

        #[ArrayShape(["errors" => "array", "puts" => "array"])] //dev array shape
        public function getPutArray($email): array
        {
            $errors = array(); //Stores errors
            $puts = array(); //Stores put array
            for ($i = 0; $i < count($this->student_params); $i++) { //Go through each parameter unique to students
                $current_param = $this->student_params[$i];
                $error = false;
                $param = getBody($current_param);
                if (!$param) continue; //If the parameter isn't defined continue, otherwise check the switch for special cases
                switch ($current_param) {
                    case "teacher_email":
                        if (!checkEmail($param)) {
                            $error = true;
                            array_push($errors, "teacher_email is invalid");
                        }
                        break;
                    case "grade":
                        if (!is_numeric($param)) {
                            $error = true;
                            array_push($errors, "grade must be a number");
                        } else  $param = intval($param);
                        break;
                    default:
                        $error = true;
                        array_push($errors, "Zac you forgot to implement the put switch for $current_param");
                    //TODO implement all put request switch cases
                }
                if (!$error) $puts[$current_param] = $param;
            }
//            echo "this far \n";
            $parent_errors_and_puts = parent::getPutArray($email);
            if (count($parent_errors_and_puts["errors"]) != 0) $errors = array_merge($errors, $parent_errors_and_puts["errors"]);
            if (count($parent_errors_and_puts["puts"]) != 0) $puts = array_merge($puts, $parent_errors_and_puts["puts"]);
            return [
                "errors" => $errors,
                "puts" => $puts,
            ];
        }
    }

    class GetStudent extends GetRegistrant
    {
        public int|null $teacher_id, $grade; //Conference numbers information
        public bool $password_set, $image_approved; //Config Toggle
        public string|null $instagram, $teacher_email, $emergency_contact; //Additional Student Information

        public function parseResult(object|array $result): bool
        {
            if (!parent::parseResult($result)) return false;
            $this->teacher_email = $result['teacher_email'];
            $this->teacher_id = intval($result['teacher_id']);
            $this->grade = intval($result['grade']);
            $this->image_approved = boolval($result['image_approved']);
            $this->instagram = $result['instagram'];
            $this->emergency_contact = $result['emergency_contact'];
            $this->password_set = boolval($result['password_set']);
            return true;
        }
    }
} else {
    echo "Import error";
}