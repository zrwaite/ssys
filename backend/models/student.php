<?php
class PostStudent { //Class for json response 
    public $email;
    public $fname;
    public $lname;
    public $password;
    public $hash;
	public $teacher_email;
	public $teacher_id;
	public $confirmation_code;
    public function __construct(){
		$this->createConfirmationCode();
    }
	public function createConfirmationCode(){
		$chars = 6;
		$data = '123456789';
  		$this->confirmation_code =  substr(str_shuffle($data), 0, $chars);
	}
	public function createPassword(){
		$chars = 10;
		$data = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz';
  		$this->password =  substr(str_shuffle($data), 0, $chars);
	}
	public function createHash(){
		$this->hash = password_hash($this->password, PASSWORD_DEFAULT);
	}
}
class GetStudent {
	public $id;
	public $fname;
    public $lname;
	public $email;
	public $email_confirmed;
	public $confirmation_code;
	public $teacher_email;
	public $teacher_id;
	public $password_set;
	public $grade;
	public $image_link;
	public $image_approved;
	public $school;
	public $shirt_size;
	public $shirts_ordered;
	public $city;
	public $workshop_choices;
	public $instagram;
	public $diet;
	public $workshop_order;
	public $video_link;
	public $video_approved;
	public $bio;
	public $additional_info;
	public $emergency_contact;
	public $account_enabled;
    public function __construct(){
    }
	public function parseResult($result){
		$this->id = intval($result['id']);
		$this->fname = $result['fname'];
		$this->lname = $result['lname'];
		$this->email = $result['email'];
		$this->email_confirmed = boolval($result['email_confirmed']);
		$this->confirmation_code = intval($result['confirmation_code']);
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
	}
}
?>