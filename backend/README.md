1. composer install

## Attendee Registration:
1. Take email, confirm it hasn't been used
    * If used or invalid, inform user
    * Otherwise open new form
1. Take first name, last name, password, and eventually payment
    * Check names and password on the back-end
    * If names are invalid, or password isn't secure, inform user
    * Otherwise check paypal API for payment confirmation, and send confirmation email
        * Confirmation email will bring to a confirmEmail.php?email="blank@gmail.com"
        * Randomly generated confirmation code sent in email will be stored in database and checked in the backend. 
1. Bring user to user page
    * Private until email confirmed