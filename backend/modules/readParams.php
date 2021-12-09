<?php
function getBody(string $param): bool|string
{
    if (isset($_POST[$param])) return htmlspecialchars(stripslashes(trim($_POST[$param])));
    else {
        $req = json_decode(file_get_contents('php://input'), true);
        if ($req[$param]) return htmlspecialchars(stripslashes(trim($req[$param])));
    }
    return false;
}

function getQuery(string $param): bool|string
{
    if (isset($_GET[$param])) return htmlspecialchars(stripslashes(trim($_GET[$param])));
    else return false;
}