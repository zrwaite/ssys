<?php
if (file_exists(__DIR__."/registrant.php")){
	//Imports
	require_once __DIR__."/registrant.php";
	class PostTeacher extends PostRegistrant{ //Class for json response 
		public string $email;
		public string $fname;
		public string $lname;
		public string $password;
		public string $hash;
		public int $confirmation_code;
		public function __construct(){
			$this->createConfirmationCode();
		}
	}
	class GetTeacher {
		public $id;
		public string $fname;
		public string $lname;
		public string $email;
		public bool $email_confirmed;
		public string $image_link;
		public string $school;
		public string $shirt_size;
		public int $shirts_ordered;
		public string $city;
		public string $workshop_choices;
		public string $diet;
		public string $workshop_order;
		public string $video_link;
		public bool $video_approved;
		public string $bio;
		public string $additional_info;
		public string $account_enabled;
		public function __construct(){
		}
		public function parseResult(object $result):bool{
			if (!boolval($result['id'])) {return false;}
			$this->id = intval($result['id']);
			$this->fname = $result['fname'];
			$this->lname = $result['lname'];
			$this->email = $result['email'];
			$this->email_confirmed = boolval($result['email_confirmed']);
			$this->image_link = $result['image_link'];
			$this->school = $result['school'];
			$this->shirt_size = $result['shirt_size'];
			$this->shirts_ordered = intval($result['shirts_ordered']);
			$this->city = $result['city'];
			$this->workshop_choices = $result['workshop_choices'];
			$this->diet = $result['diet'];
			$this->workshop_order = $result['workshop_order'];
			$this->video_link = $result['video_link'];
			$this->video_approved = boolval($result['video_approved']);
			$this->bio = $result['bio'];
			$this->additional_info = $result['additional_info'];
			$this->account_enabled = boolval($result['account_enabled']);
			return true;
		}
	}
} else {echo "Import error";}
?>