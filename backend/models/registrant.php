<?php
//Imports

use JetBrains\PhpStorm\ArrayShape;

//dev array shape import

require_once __DIR__ . "/../modules/checkers.php";

class PostRegistrant
{ //Class for json response
    public string $email = "";
    public string $fname, $lname, $password, $hash;
    public int $confirmation_code;

    public function __construct()
    {
        $this->createConfirmationCode();
    }

    public function createConfirmationCode()
    {
        $chars = 6;
        $data = '123456789';
        $this->confirmation_code = intval(substr(str_shuffle($data), 0, $chars));
    }
    public function checkEmail(): bool {
        return checkEmail($this->email);
    }
    public function checkPassword():array {
        return checkPassword($this->password);
    }
    public function createPassword(){
        $allNums = "1234567890";
        $allUppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $allLowers = "abcdefghijklmnopqrstuvwxyz";
        $allSpecial = "!@#$%^&*?";
        $numNums = mt_rand(2,5);
        $numUppers = mt_rand(2,5);
        $numLowers = mt_rand(2,5);
        $numSpecials = mt_rand(2,5);
        $nums = substr(str_shuffle($allNums), 0, $numNums);
        $uppers = substr(str_shuffle($allUppers), 0, $numUppers);
        $lowers = substr(str_shuffle($allLowers), 0, $numLowers);
        $special = substr(str_shuffle($allSpecial), 0, $numSpecials);
        $allChars = $nums . $uppers . $lowers . $special;
        $numChars = $numNums + $numUppers + $numLowers + $numSpecials;
        $this->password = substr(str_shuffle($allChars), 0, $numChars);
    }

    public function createHash()
    {
        $this->hash = password_hash($this->password, PASSWORD_DEFAULT);
    }
}

class PutRegistrant
{
    public array $params = ["fname", "lname", "password", "image_link", "school", "shirt_size", "shirts_ordered", "city", "workshop_choices", "diet", "video_link", "bio", "additional_info"];

    #[ArrayShape(["errors" => "array", "puts" => "array"])] //dev Array Shape reference
    public function getPutArray(): array
    {
        $errors = array();
        $puts = array();
        for ($i = 0; $i < count($this->params); $i++) {
            $current_param = $this->params[$i];
            $error = false;
            $param = getBody($current_param);
            if (!$param) continue; //If the parameter isn't defined continue, otherwise check the switch for special cases
            switch ($current_param) {
                case "fname":
                case "lname": //These do not have a special case right now.
                    break;
                case "password":
                    $password_errors = checkPassword($param);
                    if (count($password_errors) != 0) {
                        $errors = array_merge($errors, $password_errors);
                        $error = true;
                    }
                    break;
                default:
                    $error = true;
                    array_push($errors, "Zac you forgot to implement put switch for $current_param");
                    break;
            }
            if (!$error) $puts[$current_param] = $param;
        } //End of for loop
        return [
            "errors" => $errors,
            "puts" => $puts,
        ];
    }
}

class GetRegistrant
{
    public int $id, $shirts_ordered;
    public string $fname, $lname, $email, $registrant_type; //Primary information
    public bool $email_confirmed, $video_approved, $account_enabled;
    public string|null $image_link, $school, $city, $video_link; //Display Information
    public string|null $workshop_order, $shirt_size, $workshop_choices; //Conference Information
    public string|null $bio, $additional_info, $diet; //Additional Information

    public function parseResult(object|array $result): bool
    {
        if (!boolval($result['id'])) return false;
        $this->id = intval($result['id']);
        $this->fname = $result['fname'];
        $this->lname = $result['lname'];
        $this->email = $result['email'];
        $this->email_confirmed = boolval($result['email_confirmed']);
        $this->image_link = $result['image_link'];
        $this->school = $result['school'];
        $this->shirt_size = $result['shirt_size'];
        $this->shirts_ordered = intval($result['shirts_ordered']);
        $this->city = $result['city'];
        $this->workshop_choices = $result['workshop_choices'];
        $this->diet = $result['diet'];
        $this->workshop_order = $result['workshop_order'];
        $this->video_link = $result['video_link'];
        $this->video_approved = boolval($result['video_approved']);
        $this->bio = $result['bio'];
        $this->additional_info = $result['additional_info'];
        $this->account_enabled = boolval($result['account_enabled']);
        $this->registrant_type = $result['registrant_type'];
        return true;
    }
}