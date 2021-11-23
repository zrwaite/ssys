<?php
if (file_exists(__DIR__."/database.php")){
	//IMPORTS
	require __DIR__.'/database.php';

	//MAIN
	$accounts = DB::query("SELECT * FROM ssys22_students");
	foreach ($accounts as $account) {
		echo $account['id'] . "\n";
	}
	echo "Connected successfully";

} else {echo "Import error";}
//https://stackoverflow.com/questions/5371828/relative-path-in-require-once-doesnt-work
?>