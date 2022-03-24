<?php
//Imports

use JetBrains\PhpStorm\ArrayShape;

//dev array shape import

require_once __DIR__ . "/../modules/checkers.php";
require_once __DIR__ . "/../auth/tokens.php";
require_once __DIR__ . "/../modules/mailModules.php";
require_once __DIR__ . "/../modules/database.php";
require_once __DIR__ . "/workshops.php";


class PostUser
{ //Class for json response
    public string $email = "", $hash;
    public string|null $fname, $lname, $password;
    public int $confirmation_code;
    public string $workshop_choices;

    public function __construct()
    {
        $this->createConfirmationCode();
        $this->randomWorkshopChoices();
    }

    public function createConfirmationCode()
    {
        $chars = 6;
        $data = '123456789';
        $this->confirmation_code = intval(substr(str_shuffle($data), 0, $chars));
    }

    public function checkEmail(): bool
    {
        return checkEmail($this->email);
    }

    public function checkPassword(): array
    {
        return checkPassword($this->password);
    }

    public function createPassword()
    {
        $allNums = "1234567890";
        $allUppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $allLowers = "abcdefghijklmnopqrstuvwxyz";
        $allSpecial = "!@#$%^&*?";
        $numNums = mt_rand(2, 5);
        $numUppers = mt_rand(2, 5);
        $numLowers = mt_rand(2, 5);
        $numSpecials = mt_rand(2, 5);
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

    public function randomWorkshopChoices() {
        $workshopOptions = array();
        foreach (WORKSHOPS as $workshop) {
            array_push($workshopOptions, $workshop["code"]);
        }
        shuffle($workshopOptions);
        $this->workshop_choices = join(" ", $workshopOptions);
    }

    #[ArrayShape(["request" => "mixed", "token" => "string"])] //Dev Array shape implementation
    public function createResponse(): array
    {
        return [
            "request" => json_decode(file_get_contents('php://input'), true),
            "token" => $this->createSetToken()
        ];
    }

    public function tryCreateName():void {
        if (is_null($this->fname)) {
            $names = ["Blorg", "Bloop", "Squibbles", "Zorp"];
            $index = rand(0,3);
            $this->fname = $names[$index];
        } if (is_null($this->lname)) $this->lname = "NoName";
    }

    public function createSetToken(): string
    {
        $token = createToken(new tokenBody($this->email));
        setcookie("token", $token, time() + (86400 * 30), "/");
        return $token;
    }

    public function sendEmailConfirmation(): bool
    {
        return emailConfirmation($this->confirmation_code, $this->email);
    }

    public function addUser(): bool
    {
        $settings = DB::queryFirstRow("SELECT id, num_attendees FROM ssys22_settings LIMIT 1");
        $numAttendees = $settings['num_attendees'];
        $settingsId = $settings['id'];
        if ($numAttendees < 200) {
            $puts = ['num_attendees' => $numAttendees + 1];
            DB::update('ssys22_settings', $puts, "id=%s", $settingsId);
            return true;
        } else return false;
    }
}

class PutUser
{
    public array $params = ["fname", "lname", "password", "school", "shirt_size", "shirts_ordered", "city", "workshop_choices", "diet", "video_link", "bio", "additional_info", "public"];
// todo seperate based on user_type and add more specifications
    #[ArrayShape(["errors" => "array", "puts" => "array"])] //dev Array Shape reference
    public function getPutArray($email, $user_type): array
    {
        if ($user_type=="student"|| $user_type=="individual"){
            array_push($this->params, "grade", "instagram", "emergency_contact");
        }
        $errors = array();
        $puts = array();
        for ($i = 0; $i < count($this->params); $i++) {
            $current_param = $this->params[$i];
            $error = false;
            $param = getBody($current_param);
            if (is_null($param)) continue; //If the parameter isn't defined continue, otherwise check the switch for special cases
            switch ($current_param) {
                case "fname":
                case "lname": //These do not have a special case right now.c
                case "school":
                case "diet":
                case "city":
                case "bio":
                case "instagram":
                case "grade":
                case "additional_info":
                case "emergency_contact":
                    break;
                case "public":
                    $error = true;
                    if ($param=="public") $puts[$current_param] = true;
                    else if ($param=="private") $puts[$current_param] = false;
                    break;
                case "shirt_size":
                    $shirtOptions = ["XS", "S", "M", "L", "XL"];
                    if (!in_array($param, $shirtOptions)) {
                        array_push($errors, "invalid shirt_size");
                        $error = true;
                    }
                    break;
                case "workshop_choices":
                    $ids = WORKSHOP_IDS;
                    $input_ids = explode(" ",$param);
                    sort($ids);
                    sort($input_ids);
                    if ($ids != $input_ids) {
                        array_push($errors, "invalid workshop choices");
                        $error = true;
                    }
                    break;
                case "password":
                    $old_password = getBody("old_password");
                    if (!$old_password) {
                        array_push($errors, "old_password not defined");
                    } else {
                        $password_status = validatePassword($old_password, $email);
                        if ($password_status == 400 || $password_status == 404) $error = true;
                        if ($password_status == 400) array_push($errors, "invalid password"); //Check for failed password
                        else if ($password_status == 404) array_push($errors, "account not found"); //Check for failed account
                    }
                    $password_errors = checkPassword($param); //Check that new password is valid
                    if (count($password_errors) != 0) {
                        $errors = array_merge($errors, $password_errors);
                        $error = true;
                    }
                    if (!$error) {
                        $puts["password_hash"] = password_hash($param, PASSWORD_DEFAULT);
                        $error = true; //Set to true to avoid adding password to database instead of hash
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

class GetUser
{
    public $studentTarget = [
        "strings" => ["fname", "lname", "email", "user_type", "image_link", "school", "city", "video_link", "workshop_order", "shirt_size", "workshop_choices", "bio", "additional_info", "diet", "teacher_email", "instagram", "emergency_contact"],
        "ints" => ["id", "shirts_ordered", "teacher_id", "grade"],
        "bools" => ["password_set", "email_confirmed", "video_approved", "account_enabled", "public"]
    ];
    public $teacherTarget = [
        "strings" => ["fname", "lname", "email", "user_type", "image_link", "school", "city", "video_link", "workshop_order", "shirt_size", "workshop_choices", "bio", "additional_info", "diet" ],
        "ints" => ["id", "shirts_ordered"],
        "bools" => ["password_set", "email_confirmed", "video_approved", "account_enabled", "public"]
    ];
    public $individualTarget = [
        "strings" => ["fname", "lname", "email", "user_type", "image_link", "school", "city", "video_link", "workshop_order", "shirt_size", "workshop_choices", "bio", "additional_info", "diet", "instagram", "emergency_contact" ],
        "ints" => ["id", "shirts_ordered", "grade"],
        "bools" => ["password_set", "email_confirmed", "video_approved", "account_enabled", "public"]
    ];
    
    public function getParseResult(array|null $result): bool|array
    {
        if (is_null($result)) return false;
        $type = $result['user_type'];
        if ($type=="teacher") $target = $this->teacherTarget;
        else if ($type=="student") $target = $this->studentTarget;
        else if ($type=="individual") $target = $this->individualTarget;
        else return false;
        $resArray = [];
        foreach($target['strings'] as $elem) $resArray[$elem] = $result[$elem];
        foreach($target['ints'] as $elem) $resArray[$elem] = intval($result[$elem]);
        foreach($target['bools'] as $elem) $resArray[$elem] = boolval($result[$elem]);
        return $resArray;
    }
}

class DeleteUser
{
    public function removeUser()
    {
        $settings = DB::queryFirstRow("SELECT id, num_attendees FROM ssys22_settings LIMIT 1");
        $numAttendees = $settings['num_attendees'];
        $settingsId = $settings['id'];
        $puts = ['num_attendees' => $numAttendees - 1];
        DB::update('ssys22_settings', $puts, "id=%s", $settingsId);
    }
}