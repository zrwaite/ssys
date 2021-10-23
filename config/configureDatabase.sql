CREATE DATABASE sustaina_db;

CREATE TABLE sustaina_db.ssyc22_teachers (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name CHAR(20) NOT NULL,
    last_name CHAR(20) NOT NULL,
    email CHAR(40) NOT NULL,
	email_confirmed BOOLEAN DEFAULT 0,
	confirmation_code INT(10),
	password_set BOOLEAN,
    password_hash CHAR(200),
	num_students INT,
    image_link CHAR(200),
	school CHAR(100),
	shirt_size CHAR(5),
	shirts_ordered INT,
	city CHAR(40),
	workshop_choices CHAR(10),
	diet CHAR(200),
	workshop_order CHAR(4),
	video_link CHAR(100),
	video_approved BOOLEAN,
	bio CHAR(250),
	additional_info CHAR(250),
	account_enabled BOOLEAN DEFAULT 1
) ENGINE = InnoDB;

CREATE TABLE sustaina_db.ssyc22_students (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name CHAR(20) NOT NULL,
    last_name CHAR(20) NOT NULL,
    email CHAR(40) NOT NULL,
	email_confirmed BOOLEAN DEFAULT 0,
	confirmation_code INT(10),
	teacher_email CHAR(40),
	teacher_id INT,
	FOREIGN KEY (teacher_id) REFERENCES ssyc22_teachers(id),
	password_set BOOLEAN DEFAULT 0,
    password_hash CHAR(200),
	grade int(5),
    image_link CHAR(200),
    image_approved BOOLEAN,
	school CHAR(100),
	shirt_size CHAR(5),
	shirts_ordered INT,
	city CHAR(40),
	workshop_choices CHAR(10),
	instagram CHAR(40),
	diet CHAR(200),
	workshop_order CHAR(4),
	video_link CHAR(100),
	video_approved BOOLEAN,
	bio CHAR(250),
	additional_info CHAR(250),
	emergency_contact CHAR(200),
	account_enabled BOOLEAN DEFAULT 1
) ENGINE = InnoDB;

CREATE TABLE sustaina_db.ssyc22_admin (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	username CHAR(50) NOT NULL,
	email CHAR(40) NOT NULL,
	password_hash CHAR(200) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE sustaina_db.ssyc22_settings (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	registration_status INT NOT NULL,
	num_attendees INT NOT NULL,
	emergency_status INT NOT NULL
) ENGINE = InnoDB;