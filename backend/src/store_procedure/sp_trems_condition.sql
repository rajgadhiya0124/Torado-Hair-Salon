CREATE TABLE tbl_terms_conditions (
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

select * from tbl_terms_conditions;

-- create terms and condition
DELIMITER $$

CREATE PROCEDURE sp_create_terms_conditions(
    IN p_sub_title VARCHAR(255),
    IN p_title VARCHAR(255),
    IN p_content LONGTEXT,
    IN p_createdBy INT
)
BEGIN
    INSERT INTO tbl_terms_conditions
    (
        sub_title, title, content, createdBy, updatedBy
    )
    VALUES
    (
        p_sub_title, p_title, p_content, p_createdBy, p_createdBy
    );
END $$
DELIMITER ;


-- get terms
DELIMITER $$

CREATE PROCEDURE sp_get_terms_conditions()
BEGIN
    SELECT * 
    FROM tbl_terms_conditions
    WHERE status = 1
    ORDER BY id DESC;
END $$

DELIMITER ;

-- update terms
DELIMITER $$

CREATE PROCEDURE sp_update_terms_conditions(
    IN p_id INT,
    IN p_sub_title VARCHAR(255),
    IN p_title VARCHAR(255),
    IN p_content LONGTEXT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_terms_conditions
    SET
        sub_title = COALESCE(p_sub_title, sub_title),
        title = COALESCE(p_title, p_title),
        content = COALESCE(p_content, p_content),
        updatedBy = p_updatedBy
    WHERE id = p_id;
END $$

DELIMITER ;

-- delete terms and condtion
DELIMITER $$

CREATE PROCEDURE sp_delete_terms_conditions(
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_terms_conditions
    SET
        status = 0,
        updatedBy = p_updatedBy
    WHERE id = p_id;
END $$

DELIMITER ;
