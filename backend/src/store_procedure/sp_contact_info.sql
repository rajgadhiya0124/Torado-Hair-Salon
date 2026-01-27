CREATE TABLE tbl_contacts_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('phone','email','location') NOT NULL,
    title VARCHAR(100) NOT NULL,
    value_1 VARCHAR(255) NOT NULL,
    value_2 VARCHAR(255) DEFAULT NULL,
    
	status TINYINT(1) DEFAULT 1,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT,
    updatedBy INT 
);

select * from tbl_contacts_info;

-- create contact info
DELIMITER $$
CREATE PROCEDURE sp_create_contactinfo(
	IN p_type ENUM('phone','email','location'),
    IN p_title VARCHAR(100),
    IN p_value_1 VARCHAR(255),
	IN p_value_2 VARCHAR(255),
    IN p_createdBy INT
)
BEGIN
	INSERT INTO tbl_contacts_info (type, title, value_1, value_2, createdBy, updatedBy)
	VALUES ( p_type, p_title, p_value_1, p_value_2, p_createdBy , p_createdBy);
    
END $$
DELIMITER ;

-- get all contact info
DELIMITER $$
CREATE PROCEDURE sp_get_all_contactinfo()
BEGIN 
	SELECT * FROM tbl_contacts_info
    WHERE status = 1
    ORDER BY id DESC;
END $$

DELIMITER ;


-- update contact info
DELIMITER $$
CREATE PROCEDURE sp_update_contact_info (
    IN p_id INT,
    IN p_type ENUM('phone','email','location'),
    IN p_title VARCHAR(100),
    IN p_value_1 VARCHAR(255),
    IN p_value_2 VARCHAR(255),
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_contacts_info
    SET
		type    = COALESCE(p_type, type),
		title   = COALESCE(p_title, title),
		value_1 = COALESCE(p_value_1, value_1),
		value_2 = COALESCE(p_value_2, value_2),
        updatedBy = p_updatedBy
    WHERE id = p_id;
END$$
DELIMITER ;

-- delete contact info
DELIMITER $$
CREATE PROCEDURE sp_delete_contact_info (
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_contacts_info
    SET
        status = 0,
        updatedBy = p_updatedBy
    WHERE id = p_id;
END$$
DELIMITER ;
