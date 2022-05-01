<?php

function generateAccessCode()
{
    $allNums = "1234567890";
    $allUppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    $allLowers = "abcdefghijklmnopqrstuvwxyz";
    $numNums = mt_rand(5, 8);
    $numUppers = mt_rand(5, 8);
    $numLowers = mt_rand(5, 8);
    $nums = substr(str_shuffle($allNums), 0, $numNums);
    $uppers = substr(str_shuffle($allUppers), 0, $numUppers);
    $lowers = substr(str_shuffle($allLowers), 0, $numLowers);
    $allChars = $nums . $uppers . $lowers;
    $numChars = 10;
    return substr(str_shuffle($allChars), 0, $numChars);
}