<?php
switch ($_SERVER['REQUEST_METHOD']) {
    case "POST":
        require __DIR__ . "/postImage.php";
        break;
    case "DELETE":
        require __DIR__ . "/deleteImage.php";
        break;
}