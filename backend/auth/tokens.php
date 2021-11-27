<?php
use Symfony\Component\Dotenv\Dotenv;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
header('Content-Type:application/json; charset=utf-8');

if (file_exists(__DIR__."/../vendor/autoload.php")
&& file_exists(__DIR__."/../modules/env/.env")){
	//Imports
	require_once __DIR__."/../vendor/autoload.php";
	$dotenv = new Dotenv();
	$dotenv->load(__DIR__."/../modules/env/.env");
	class tokenBody  {
		public string $email;
		function __construct($email) {
			$this->email = $email;
		}
	}
	function createToken (object $body): string{
		$key = $_ENV['JWT_KEY'];
		$token = JWT::encode($body, $key, 'HS256');
		return $token;
	}
	function verifyToken (string $token): bool|object {
		$key = $_ENV['JWT_KEY'];
		try {
			$decoded = JWT::decode($token, new Key($key, 'HS256'));
			return $decoded;
		} catch (Exception $e) {
			return false;
		}
	}
	function getToken (): bool|string{
		$auth = getallheaders()["Authorization"];
		$token = explode(" ", $auth)[1]; //Got to love php's string split being EXPLODE
		$token = str_replace("\"", "",$token);
		if ($token) return $token;
		else return false;
	}
} else {echo "Import error";}
//getToken from auth
?>