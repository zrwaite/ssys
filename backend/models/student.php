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
	public $workship_choices;
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
}
?>