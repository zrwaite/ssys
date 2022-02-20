<?php
function getBody(string $param): null|string
{
    if (isset($_POST[$param])) return htmlspecialchars(stripslashes(trim($_POST[$param])));
    else {
        $req = json_decode(file_get_contents('php://input'), true);
        if (isset($req[$param])) return htmlspecialchars(stripslashes(trim($req[$param])));
    }
    return null;
}

function getQuery(string $param): null|string
{
    if (isset($_GET[$param])) return htmlspecialchars(stripslashes(trim($_GET[$param])));
    else return null;
}