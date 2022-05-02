<?php

function useCode(string $code, bool $teacher)
{
    try {
        $result = DB::queryFirstRow("SELECT owner FROM ssys22_codes WHERE code=%s AND teacher=%s AND used=%s LIMIT 1", $code, $teacher, false);
        if ($result["owner"]) {
            DB::update('ssys22_codes', ["used" => true], "code=%s", $code);
            return $result["owner"];
        } else return null;
    } catch (Exception $e) {
        echo "database error";
        return null;
    }
}