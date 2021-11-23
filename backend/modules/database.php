<?php
use Symfony\Component\Dotenv\Dotenv;
if (file_exists(__DIR__."/../vendor/autoload.php")
&& file_exists(__DIR__.'/meekrodb-2.4/db.class.php')
&& file_exists(__DIR__.'/env/.env')){
	//Imports
	require_once __DIR__."/../vendor/autoload.php";
	require_once __DIR__.'/meekrodb-2.4/db.class.php';
	$dotenv = new Dotenv();
	$dotenv->load(__DIR__.'/env/.env');

	//Main

	DB::$user = $_ENV['USERNAME'];
	DB::$password = $_ENV['PASSWORD'];
	DB::$dbName = $_ENV['DBNAME'];


} else {echo "Import error";}
//https://stackoverflow.com/questions/5371828/relative-path-in-require-once-doesnt-work
?>