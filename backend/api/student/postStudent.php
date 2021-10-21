<?php
class PostStudent { //Class for json response 
    public $email;
    public $fname;
    public $lname;
    public $password;
    public $hash;
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
echo 'Hello ' . htmlspecialchars($_GET["name"]) . '!';
?>
