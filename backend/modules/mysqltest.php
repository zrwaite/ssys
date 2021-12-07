<?php
//IMPORTS
require __DIR__.'/database.php';

//MAIN
$accounts = DB::query("SELECT * FROM ssys22_students");
foreach ($accounts as $account) {
    echo $account['id'] . "\n";
}
echo "Connected successfully";
?>