CREATE TABLE tbl_contactus (
    id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(255),
    subject VARCHAR(255),
    message TEXT,
    
	status TINYINT(1) DEFAULT 1,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT,
    updatedBy INT 
);

select * from tbl_contactus;

-- create contact 
DELIMITER $$
CREATE PROCEDURE sp_create_contactus (
    IN p_name VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_phone VARCHAR(255),
    IN p_subject VARCHAR(255),
    IN p_message TEXT,
    IN p_createdBy INT
)
BEGIN
    INSERT INTO tbl_contactus 
	( name, email, phone, subject, message, createdBy , updatedBy)
    VALUES
    (   p_name, p_email,p_phone, p_subject, p_message, p_createdBy,p_createdBy);
END$$
DELIMITER ;

-- get all contactus
DELIMITER $$

CREATE PROCEDURE sp_get_all_contactus ()
BEGIN
    SELECT *
    FROM tbl_contactus
    WHERE status = 1
    ORDER BY id DESC;
END$$

DELIMITER ;

-- delete contactus
DELIMITER $$
CREATE PROCEDURE sp_delete_contactus (
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_contactus
    SET
        status = 0,
        updatedBy = p_updatedBy
    WHERE id = p_id;
END$$
DELIMITER ;
