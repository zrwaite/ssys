<?php
if (file_exists(__DIR__ . "/registrant.php")) {
    //Imports
    require_once __DIR__ . "/registrant.php";

    class PostStudent extends PostRegistrant
    { //Class for json response
        public string|null $teacher_email;
        public int|null $teacher_id;
        public bool $password_set;

        public function __construct()
        {
            parent::__construct();
            $this->password_set = false;
            $this->teacher_email = null;
            $this->teacher_id = null;
            $this->fname = "Person";
            $this->lname = "Smith";
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