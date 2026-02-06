CREATE TABLE tbl_privacy_policy (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sub_title VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content LONGTEXT NOT NULL,
    
    status TINYINT DEFAULT 1,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT,
    updatedBy INT
);

select * from tbl_privacy_policy;

-- create privcy policy
DELIMITER $$

CREATE PROCEDURE sp_create_privacy_policy (
	IN p_sub_title VARCHAR(255),
    IN p_title VARCHAR(255),
    IN p_content LONGTEXT,
    IN p_createdBy INT
)
BEGIN
    INSERT INTO tbl_privacy_policy (
        sub_title,title, content, createdBy, updatedBy
    )
    VALUES (
        p_sub_title, p_title, p_content, p_createdBy, p_createdBy
    );
END$$

DELIMITER ;

-- get privcy
DELIMITER $$

CREATE PROCEDURE sp_get_privacy_policy ()
BEGIN
    SELECT *
    FROM tbl_privacy_policy
    WHERE status = 0;
END$$

DELIMITER ;

-- update privcy
DELIMITER $$

CREATE PROCEDURE sp_update_privacy_policy (
    IN p_id INT,
    IN p_sub_title VARCHAR(255),
    IN p_title VARCHAR(255),
    IN p_content LONGTEXT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_privacy_policy
    SET
		sub_title=p_sub_title,
        title = p_title,
        content = p_content,
        updatedBy = p_updatedBy
    WHERE id = p_id;
END$$

DELIMITER ;

-- delete privcy
DELIMITER $$

CREATE PROCEDURE sp_delete_privacy_policy (
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_privacy_policy 
    SET status = 0 ,
		updatedBy = p_updatedBy
    WHERE id = p_id;
END$$

DELIMITER ;


