<?php

require_once __DIR__ . "/mailer.php";

function emailConfirmation(string $confirmation_code, string $email): bool
{
    $mailHtml = "
                <h1>Validate your email <a href='http://localhost:3000/confirmEmail?email=" . $email . "'>here</a></h1>
                <p>Confirmation Code: " . $confirmation_code . "</p>";
    $mailText = "
                Validate your email here: http://localhost:3000/confirmEmail?email=" . $email . "
                Confirmation Code: " . $confirmation_code;
    sendMail([$email], "Validate Email - Sustainable Simcoe Youth Conference", $mailHtml, $mailText);
    return true;
}