CREATE TABLE tbl_gallery_category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    
    status TINYINT(1) DEFAULT 1,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT DEFAULT NULL,
    updatedBy INT DEFAULT NULL
);

select * from tbl_gallery_category;

-- //create gallery category
DELIMITER $$

CREATE PROCEDURE sp_create_gallery_category (
    IN p_category_name VARCHAR(100),
    IN p_createdBy INT
)
BEGIN
    INSERT INTO tbl_gallery_category (
        category_name, createdBy, updatedBy
    )
    VALUES (
        p_category_name, p_createdBy, p_createdBy
    );
END $$

DELIMITER ;


-- get all category
DELIMITER $$

CREATE PROCEDURE sp_get_all_gallery_categories ()
BEGIN
    SELECT *
    FROM tbl_gallery_category
    ORDER BY createdAt DESC;
END $$

DELIMITER ;


-- update Product status
DELIMITER $$
CREATE PROCEDURE sp_toggle_gallery_cat_status(
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_gallery_category
    SET 
        status = CASE 
                    WHEN status = 1 THEN 0
                    ELSE 1
                 END,
        updatedBy = p_updatedBy
    WHERE id = p_id;
END $$
DELIMITER ;



-- delete gallery category
DELIMITER $$

CREATE PROCEDURE sp_delete_gallery_category (
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_gallery_category
    SET
        status = 0,
        updatedBy = p_updatedBy
    WHERE id = p_id;
END $$

DELIMITER ;


