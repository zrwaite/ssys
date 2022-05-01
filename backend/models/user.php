<?php
//Imports

use JetBrains\PhpStorm\ArrayShape;

//dev array shape import

require_once __DIR__ . "/../modules/checkers.php";
require_once __DIR__ . "/../auth/tokens.php";
require_once __DIR__ . "/../modules/database.php";
require_once __DIR__ . "/workshops.php";

const userPostParams = [
    "username",
    "fname",
    "lname",
    "teacher"
];

class PostUser
{ //Class for json response
    public string $password, $code;
    public array $postData = [
        "username" => "",
        "fname" => "",
        "lname" => "",
        "teacher" => false,
        "password_hash" => "",
        "workshop_choices" => ""
    ];

    public function __construct()
    {
        $this->randomWorkshopChoices();
    }

    public function usernameInUse(): bool
    {
        return usernameInUse($this->postData["username"]);
    }

    public function checkPassword(): array
    {
        return checkPassword($this->password);
    }

    public function createHash()
    {
        $this->postData["password_hash"] = password_hash($this->password, PASSWORD_DEFAULT);
    }

    public function checkCode(): array
    {
        return checkCode($this->code, $this->postData["teacher"]);
    }

    public function useCode(): string|null
    {
        return useCode($this->code, $this->postData["teacher"]);
    }

    public function randomWorkshopChoices()
    {
        $workshopOptions = array();
        foreach (WORKSHOPS as $workshop) {
            array_push($workshopOptions, $workshop["code"]);
        }
        shuffle($workshopOptions);
        $this->postData["workshop_choices"] = join(" ", $workshopOptions);
    }

    #[ArrayShape(["request" => "mixed", "token" => "string"])] //Dev Array shape implementation
    public function createResponse(): array
    {
        return [
            "request" => $this->postData,
            "token" => $this->createSetToken()
        ];
    }

    public function createSetToken(): string
    {
        $token = createToken(new tokenBody($this->postData["username"]));
        setcookie("token", $token, time() + (86400 * 30), "/");
        return $token;
    }

    public function addUser(): bool
    {
        $settings = DB::queryFirstRow("SELECT id, num_attendees FROM ssys22_settings LIMIT 1");
        $numAttendees = $settings['num_attendees'];
        $settingsId = $settings['id'];
        if ($numAttendees < 250) {
            $puts = ['num_attendees' => $numAttendees + 1];
            DB::update('ssys22_settings', $puts, "id=%s", $settingsId);
            return true;
        } else return false;
    }
}

class PutUser
{
    public array $params = ["fname", "lname", "password", "school", "city", "workshop_choices", "diet", "bio", "additional_info", "public", "grade", "instagram", "emergency_contact"];
// todo seperate based on user_type and add more specifications
    #[ArrayShape(["errors" => "array", "puts" => "array"])] //dev Array Shape reference
    public function getPutArray($email): array
    {
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
    public $parseTarget = [
        "strings" => ["fname", "lname", "username", "image_link", "school", "city", "workshop_order", "workshop_choices", "bio", "additional_info", "diet", "teacher_email", "instagram", "emergency_contact"],
        "ints" => ["id", "grade"],
        "bools" => ["account_enabled", "public", "teacher"]
    ];


    public function getParseResult(array|null $result): bool|array
    {
        if (is_null($result)) return false;
        foreach ($this->parseTarget['strings'] as $elem) $resArray[$elem] = $result[$elem];
        foreach ($this->parseTarget['ints'] as $elem) $resArray[$elem] = intval($result[$elem]);
        foreach ($this->parseTarget['bools'] as $elem) $resArray[$elem] = boolval($result[$elem]);
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