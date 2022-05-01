CREATE DATABASE sustaina_db;

create table sustaina_db.ssys22_codes
(
    id   int auto_increment primary key,
    code char(20),
    type char(20),
    used BOOLEAN default 0
);

CREATE TABLE sustaina_db.ssys22_users
(
    id                INT      NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fname             CHAR(20) NOT NULL,
    lname             CHAR(20) NOT NULL,
    email             CHAR(40) NOT NULL,
    email_confirmed   BOOLEAN  DEFAULT 0,
    confirmation_code INT(10),
    teacher_email     CHAR(40),
    teacher_id        INT,
    password_set      BOOLEAN  DEFAULT 0,
    password_hash     CHAR(200),
    grade             int(5),
    image_link        CHAR(200),
    image_approved    BOOLEAN  DEFAULT 0,
    school            CHAR(100),
    city              CHAR(40),
    workshop_choices  VARCHAR(400),
    instagram         CHAR(40),
    diet              CHAR(200),
    workshop_order    VARCHAR(400),
    bio               CHAR(250),
    additional_info   CHAR(250),
    emergency_contact CHAR(200),
    public            BOOLEAN  DEFAULT 0,
    account_enabled   BOOLEAN  DEFAULT 1,
    user_type   CHAR(40)
) ENGINE = InnoDB;

CREATE TABLE sustaina_db.ssys22_admin
(
    id            INT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username      CHAR(50)  NOT NULL,
    email         CHAR(40)  NOT NULL,
    password_hash CHAR(200) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE sustaina_db.ssys22_settings
(
    id                  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    registration_status INT NOT NULL,
    -- 0: Not open yet
    -- 1: Open
    -- 2: Full
    -- 3: Finished
    -- 4: Cancelled
    num_attendees       INT NOT NULL,
    emergency_status    INT NOT NULL
    -- 0: None
    -- 1: Fire
    -- 2: Inclement weather
    -- 3: Lockdown
) ENGINE = InnoDB;