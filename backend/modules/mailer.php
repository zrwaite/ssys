<?php

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use Symfony\Component\Dotenv\Dotenv;

//use PHPMailer\PHPMailer\SMTP;

//Imports
require_once __DIR__ . "/../vendor/autoload.php";
$dotenv = new Dotenv();
$dotenv->load(__DIR__ . '/env/.env');
//Main
function mailConstants(object|array $mailvar): object|array
{
    $mailvar->SMTPDebug = 0;
    $mailvar->isSMTP();
    $mailvar->Host = 'smtp.gmail.com';
    $mailvar->SMTPAuth = true;
    $mailvar->Port = 587;
    $mailvar->SMTPSecure = 'tls';
    $mailvar->isHTML(true);
    $mailvar->Username = 'ssysmailer@sustainableorillia.ca';
    $mailvar->Password = $_ENV['EMAIL_PASSWORD'];
    $mailvar->setFrom('ssysmailer@sustainableorillia.ca', 'Sustainable Simcoe Youth Summit');
    // Attachments
    // $mail->addAttachment('../../files/AGM/Notice-of-AGM.docx', 'Notice-ofAGM.docx');
    // $mail->AddEmbeddedImage('../../files/images/longSoLogo.jpeg', 'soLogo');
    return $mailvar;
}

function sendMail(array $emails, string $subject, string $html, string $text): bool
{
    $mail = mailConstants(new PHPMailer(true));
    $mail->addReplyTo('ssyscontact@sustainableorillia.ca', 'SSYS');
    try {
        for ($i = 0; $i < count($emails); $i++) {
            $mail->addAddress($emails[$i]);
        }
        $mail->Subject = $subject;//'Sustainable Orillia Notice of AGM'
        $mail->Body = $html; //Html
        $mail->AltBody = $text; //Alt
        $mail->send();
        return true;
    } catch (Exception) {
        echo "ERROR:" . $emails[$i] . ". Mailer Error: $mail->ErrorInfo";
        return false;
    }
}

function receiveMail(string $to, string $from, string $html, string $text): bool
{
    $mail = mailConstants(new PHPMailer(true));
    $mail->addReplyTo($from);
    try {
        $mail->addAddress($to);
        $mail->Subject = "SSYS Contact Form Message";
        $mail->Body = $html; //Html
        $mail->AltBody = $text; //Alt
        $mail->send();
        return true;
    } catch (Exception) {
        echo "ERROR:" . $to . ". Mailer Error: $mail->ErrorInfo";
        return false;
    }
}