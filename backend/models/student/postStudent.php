<?php
class PostStudent { //Class for json response 
    public $email;
    public $fname;
    public $lname;
    public $password;
    public $hash;
	public $teacher_email;
	public $teacher_id;
    public function __construct(){
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
function getPost($param){
	if (isset($_POST[$param])) return htmlspecialchars(stripslashes(trim($_POST[$param])));
	else return false;
}
?>