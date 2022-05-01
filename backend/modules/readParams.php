<?php
function getBody(string $param): mixed
{
    if (isset($_POST[$param])) return $_POST[$param];
    else {
        $req = json_decode(file_get_contents('php://input'), true);
        if (isset($req[$param])) return $req[$param];
    }
    return null;
}

function getQuery(string $param): null|string
{
    if (isset($_GET[$param])) return $_GET[$param];
    else return null;
}