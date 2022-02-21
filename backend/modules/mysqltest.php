<?php
header('Access-Control-Allow-Origin: *'); //dev allow localhost cors
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

//IMPORTS
require __DIR__ . '/database.php';

//MAIN
$ids = array();
$accounts = DB::query("SELECT id FROM ssys22_users");
foreach ($accounts as $account) {
    array_push($ids, $account['id']);
}
http_response_code(400);

echo json_encode(["ids" => $ids, "success" => true]);