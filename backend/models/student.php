<?php
if (file_exists(__DIR__."/registrant.php")){
	//Imports
	require_once __DIR__."/registrant.php";
	class PostStudent extends PostRegistrant { //Class for json response 
		public string $email;
		public string $fname;
		public string $lname;
		public string $password;
		public string $hash;
		public string $teacher_email;
		public int $teacher_id;
		public int $confirmation_code;
		public bool $password_set;
		public function __construct(){
			$this->password_set = false;
			$this->teacher_email = null;
			$this->teacher_id = null;
			$this->fname = "Person";
			$this->lname = "Smith";
			$this->createConfirmationCode();
		}
	}
	class GetStudent {
		public int $id;
		public string $fname;
		public string $lname;
		public string $email;
		public bool $email_confirmed;
		public string $teacher_email;
		public int $teacher_id;
		public bool $password_set;
		public int $grade;
		public string $image_link;
		public bool $image_approved;
		public string $school;
		public string $shirt_size;
		public int $shirts_ordered;
		public string $city;
		public string $workshop_choices;
		public string $instagram;
		public string $diet;
		public string $workshop_order;
		public string $video_link;
		public bool $video_approved;
		public string $bio;
		public string $additional_info;
		public string $emergency_contact;
		public string $account_enabled;
		public function __construct(){
		}
		public function parseResult(object $result): bool {
			if (!boolval($result['id'])) {return false;}
			$this->id = intval($result['id']);
			$this->fname = $result['fname'];
			$this->lname = $result['lname'];
			$this->email = $result['email'];
			$this->email_confirmed = boolval($result['email_confirmed']);
			$this->teacher_email = $result['teacher_email'];
			$this->teacher_id = intval($result['teacher_id']);
			$this->password_set = boolval($result['password_set']);
			$this->grade = intval($result['grade']);
			$this->image_link = $result['image_link'];
			$this->image_approved = boolval($result['image_approved']);
			$this->school = $result['school'];
			$this->shirt_size = $result['shirt_size'];
			$this->shirts_ordered = intval($result['shirts_ordered']);
			$this->city = $result['city'];
			$this->workshop_choices = $result['workshop_choices'];
			$this->instagram = $result['instagram'];
			$this->diet = $result['diet'];
			$this->workshop_order = $result['workshop_order'];
			$this->video_link = $result['video_link'];
			$this->video_approved = boolval($result['video_approved']);
			$this->bio = $result['bio'];
			$this->additional_info = $result['additional_info'];
			$this->emergency_contact = $result['emergency_contact'];
			$this->account_enabled = boolval($result['account_enabled']);
			return true;
		}
	}
}else {echo "Import error";}
?>