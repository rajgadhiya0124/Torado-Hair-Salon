CREATE TABLE tbl_blog_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    category_slug VARCHAR(120) NOT NULL UNIQUE,
    
    status TINYINT(1) DEFAULT 1,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT,
    updatedBy INT
);

select * from tbl_blog_categories;

-- create blog category
DELIMITER $$
CREATE PROCEDURE sp_create_blog_category (
	IN p_category_name VARCHAR(100),
    IN p_category_slug VARCHAR(120),
    IN p_createdBy INT
)
BEGIN
	INSERT INTO tbl_blog_categories (category_name, category_slug, createdBy , updatedBy)
    VALUES (p_category_name, p_category_slug,p_createdBy, p_createdBy);
END $$

DELIMITER ;

-- get all blog category
DELIMITER $$

CREATE PROCEDURE sp_get_all_blog_category()
BEGIN
    SELECT * FROM tbl_blog_categories
    ORDER BY id DESC;
END $$

DELIMITER ;

-- get all blog category for admin

-- DELIMITER $$
-- CREATE PROCEDURE sp_get_all_blog_category_admin()
-- BEGIN
--     SELECT *
--     FROM tbl_blog_categories
--     ORDER BY id DESC;
-- END $$
-- DELIMITER ;


-- update blog category status
DELIMITER $$
CREATE PROCEDURE sp_toggle_blog_category_status(
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_blog_categories
    SET 
        status = CASE 
                    WHEN status = 1 THEN 0
                    ELSE 1
                 END,
        updatedBy = p_updatedBy
    WHERE id = p_id;
END $$
DELIMITER ;


-- update blog category
DELIMITER $$

CREATE PROCEDURE sp_update_blog_category(
    IN p_id INT,
    IN p_category_name VARCHAR(100),
    IN p_category_slug VARCHAR(120),
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_blog_categories
    SET 
        category_name = 	COALESCE(p_category_name, category_name),
        category_slug =     COALESCE(p_category_slug, category_slug),
        updatedBy = p_updatedBy
    WHERE id = p_id;
END $$

DELIMITER ;

-- delete blog category
DELIMITER $$

CREATE PROCEDURE sp_delete_blog_category(
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_blog_categories
    SET 
		status = 0,
		updatedBy = p_updatedBy
    WHERE id = p_id;
END $$

DELIMITER ;
