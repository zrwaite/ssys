<?php
if (file_exists(__DIR__."/../modules/checkers.php")){
	//Imports
	require_once __DIR__."/../modules/checkers.php";

	class PostRegistrant { //Class for json response 
		public string $email;
		public string $password;
		public string $hash;
		public int $confirmation_code;
		public function __construct(){
			$this->createConfirmationCode();
		}
		public function createConfirmationCode(){
			$chars = 6;
			$data = '123456789';
			$this->confirmation_code =  intval(substr(str_shuffle($data), 0, $chars));
		}
		public function checkEmail() {
			checkEmail($this->email);
		}
		public function checkPassword() {
			checkPassword($this->password);
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
} else {echo "Import Error";}
?>