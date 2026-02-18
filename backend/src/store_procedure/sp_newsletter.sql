CREATE TABLE tbl_newsletter (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    
    status TINYINT(1) DEFAULT 1,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT,
    updatedBy INT
);

select * from tbl_newsletter;

-- create or new newsletter(subscriber)
DELIMITER $$
CREATE PROCEDURE sp_create_newsletter (
    IN p_email VARCHAR(255),
    IN p_createdBy INT
)
BEGIN
    INSERT INTO tbl_newsletter (email, createdBy, updatedBy)
    VALUES (p_email, p_createdBy, p_createdBy);
END$$
DELIMITER ;


-- get all newsletter
DELIMITER $$
CREATE PROCEDURE sp_get_all_newsletters ()
BEGIN
    SELECT *
    FROM tbl_newsletter
 
    ORDER BY id DESC;
END$$
DELIMITER ;

-- delete newsletter 
DELIMITER $$
CREATE PROCEDURE sp_delete_newsletter (
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_newsletter
    SET status = 0,
        updatedBy = p_updatedBy
    WHERE id = p_id;
END$$
DELIMITER ;


