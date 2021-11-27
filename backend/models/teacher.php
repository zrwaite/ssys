<?php
if (file_exists(__DIR__."/registrant.php")){
	//Imports
	require_once __DIR__."/registrant.php";
	class PostTeacher extends PostRegistrant{ //Class for json response 
		public $email;
		public $fname;
		public $lname;
		public $password;
		public $hash;
		public $confirmation_code;
		public function __construct(){
			$this->createConfirmationCode();
		}
	}
	class GetTeacher {
		public $id;
		public $fname;
		public $lname;
		public $email;
		public $email_confirmed;
		public $image_link;
		public $school;
		public $shirt_size;
		public $shirts_ordered;
		public $city;
		public $workshop_choices;
		public $diet;
		public $workshop_order;
		public $video_link;
		public $video_approved;
		public $bio;
		public $additional_info;
		public $account_enabled;
		public function __construct(){
		}
		public function parseResult($result){
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