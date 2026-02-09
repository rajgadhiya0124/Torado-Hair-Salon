CREATE TABLE tbl_home_aboutus (
    id INT AUTO_INCREMENT PRIMARY KEY,
	
    about_image VARCHAR(255),
    sub_title VARCHAR(255),
    main_title VARCHAR(255),
    small_description TEXT,

    second_title VARCHAR(255),
    second_description TEXT,
    contact_no VARCHAR(20),

	status TINYINT DEFAULT 1,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT,
    updatedBy INT
);

select * from tbl_home_aboutus;

-- create aboutus
DELIMITER $$

CREATE PROCEDURE sp_create_home_aboutus(
	IN p_about_image VARCHAR(255),
    IN p_sub_title VARCHAR(255),
    IN p_main_title VARCHAR(255),
    IN p_small_description TEXT,
    IN p_second_title VARCHAR(255),
    IN p_second_description TEXT,
    IN p_contact_no VARCHAR(20),
    IN p_createdBy INT
)
BEGIN

INSERT INTO tbl_home_aboutus(
	about_image, sub_title, main_title, small_description, 
    second_title, second_description, contact_no, createdBy, updatedBy
)
VALUES(
	p_about_image, p_sub_title, p_main_title, p_small_description,
    p_second_title, p_second_description, p_contact_no, p_createdBy, p_createdBy
);

END$$
DELIMITER ;


-- get home about
DELIMITER $$

CREATE PROCEDURE sp_get_home_aboutus()
BEGIN
    SELECT * FROM tbl_home_aboutus
    WHERE status = 1
    ORDER BY id DESC
    LIMIT 1;
END$$
DELIMITER ;


-- update home aboutus
DELIMITER $$

CREATE PROCEDURE sp_update_home_aboutus(
    IN p_id INT,
    IN p_about_image VARCHAR(255),
    IN p_sub_title VARCHAR(255),
    IN p_main_title VARCHAR(255),
    IN p_small_description TEXT,
    IN p_second_title VARCHAR(255),
    IN p_second_description TEXT,
    IN p_contact_no VARCHAR(20),
    IN p_updatedBy INT
)
BEGIN

UPDATE tbl_home_aboutus
SET
	about_image = COALESCE(p_about_image, about_image),
    sub_title = COALESCE(p_sub_title, sub_title),
    main_title = COALESCE(p_main_title, main_title),
    small_description = COALESCE(p_small_description, small_description),
    second_title = COALESCE(p_second_title, second_title),
    second_description = COALESCE(p_second_description, second_description),
    contact_no = COALESCE(p_contact_no, contact_no),
    updatedBy = p_updatedBy
WHERE id = p_id;

END$$
DELIMITER ;


-- delete home about
DELIMITER $$
CREATE PROCEDURE sp_delete_home_aboutus(
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_home_aboutus
    SET status = 0,
		updatedBy = p_updatedBy
    WHERE id = p_id;
END$$
DELIMITER ;

