<?php
switch ($_SERVER['REQUEST_METHOD']) {
    case "POST":
        require __DIR__ . "/postContact.php";
        break;
}