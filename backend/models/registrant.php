<?php

class PostRegistrant { //Class for json response 
    public $email;
    public $password;
    public $hash;
	public $confirmation_code;
    public function __construct(){
		$this->createConfirmationCode();
    }
	public function createConfirmationCode(){
		$chars = 6;
		$data = '123456789';
  		$this->confirmation_code =  substr(str_shuffle($data), 0, $chars);
	}
	public function checkEmail(){
		if (filter_var($this->email, FILTER_VALIDATE_EMAIL)) return true;
		else return false;
	}
	public function checkPassword(){
		$errors = array();
		if (strlen($this->password)<8) array_push($errors, "password too short");
		if (!preg_match('/[a-z]/', $this->password)) array_push($errors, "password must contain lower-case letter");
		if (!preg_match('/[A-Z]/', $this->password)) array_push($errors, "password must contain upper-case letter");
		if (!preg_match('/\d/', $this->password)) array_push($errors, "password must contain number");
		if (!preg_match('/[^a-zA-Z\d]/', $this->password)) array_push($errors, "password must contain special character");
		  return ($errors);
	}
	public function createPassword(){
		$allNums = "1234567890";
		$allUppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		$allLowers = "abcdefghijklmnopqrstuvwxyz";
		$allSpecial = "!@#$%^&*?";
		$numNums = mt_rand(2,5);
		$numUppers = mt_rand(2,5);
		$numLowers = mt_rand(2,5);
		$numSpecials = mt_rand(2,5);
		$nums = substr(str_shuffle($allNums), 0, $numNums);
		$uppers = substr(str_shuffle($allUppers), 0, $numUppers);
		$lowers = substr(str_shuffle($allLowers), 0, $numLowers);
		$special = substr(str_shuffle($allSpecial), 0, $numSpecials);
		$allChars = $nums.$uppers.$lowers.$special;
		$numChars = $numNums + $numUppers + $numLowers + $numSpecials;
  		$this->password =  substr(str_shuffle($allChars), 0, $numChars);
	}
	public function createHash(){
		$this->hash = password_hash($this->password, PASSWORD_DEFAULT);
	}
}
?>