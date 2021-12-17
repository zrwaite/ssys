CREATE DATABASE sustaina_db;

CREATE TABLE sustaina_db.ssys22_teachers
(
    id                INT      NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fname             CHAR(20) NOT NULL,
    lname             CHAR(20) NOT NULL,
    email             CHAR(40) NOT NULL,
    email_confirmed   BOOLEAN  DEFAULT 0,
    confirmation_code INT(10),
    password_hash     CHAR(200),
    num_students      INT      DEFAULT 0,
    image_link        CHAR(200),
    school            CHAR(100),
    shirt_size        CHAR(5),
    shirts_ordered    INT      DEFAULT 0,
    city              CHAR(40),
    workshop_choices  CHAR(10),
    diet              CHAR(200),
    workshop_order    CHAR(4),
    video_link        CHAR(100),
    video_approved    BOOLEAN  DEFAULT 0,
    bio               CHAR(250),
    additional_info   CHAR(250),
    account_enabled   BOOLEAN  DEFAULT 1,
    public            BOOLEAN  DEFAULT 0,
    registrant_type   CHAR(40) DEFAULT "teacher"
) ENGINE = InnoDB;

CREATE TABLE sustaina_db.ssys22_students
(
    id                INT      NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fname             CHAR(20) NOT NULL,
    lname             CHAR(20) NOT NULL,
    email             CHAR(40) NOT NULL,
    email_confirmed   BOOLEAN  DEFAULT 0,
    confirmation_code INT(10),
    teacher_email     CHAR(40),
    teacher_id        INT,
    FOREIGN KEY (teacher_id) REFERENCES ssys22_teachers (id),
    password_set      BOOLEAN  DEFAULT 0,
    password_hash     CHAR(200),
    grade             int(5),
    image_link        CHAR(200),
    image_approved    BOOLEAN  DEFAULT 0,
    school            CHAR(100),
    shirt_size        CHAR(5),
    shirts_ordered    INT      DEFAULT 0,
    city              CHAR(40),
    workshop_choices  CHAR(10),
    instagram         CHAR(40),
    diet              CHAR(200),
    workshop_order    CHAR(4),
    video_link        CHAR(100),
    video_approved    BOOLEAN  DEFAULT 0,
    bio               CHAR(250),
    additional_info   CHAR(250),
    emergency_contact CHAR(200),
    public            BOOLEAN  DEFAULT 0,
    account_enabled   BOOLEAN  DEFAULT 1,
    registrant_type   CHAR(40) DEFAULT "individual"
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
    num_attendees       INT NOT NULL,
    emergency_status    INT NOT NULL
) ENGINE = InnoDB;