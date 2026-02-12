CREATE TABLE tbl_blog_tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(100) NOT NULL UNIQUE,
    tag_slug VARCHAR(120) NOT NULL UNIQUE,
    
    status TINYINT(1) DEFAULT 1,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT,
    updatedBy INT
);

select * from tbl_blog_tags;

-- create blog tag
DELIMITER $$

CREATE PROCEDURE sp_create_blog_tag(
    IN p_tag_name VARCHAR(100),
    IN p_tag_slug VARCHAR(120),
    IN p_createdBy INT
)
BEGIN
    INSERT INTO tbl_blog_tags (tag_name, tag_slug, createdBy, updatedBy)
    VALUES (p_tag_name, p_tag_slug, p_createdBy, p_createdBy);
END $$

DELIMITER ;


-- get all tag
DELIMITER $$

CREATE PROCEDURE sp_get_all_blog_tags()
BEGIN
    SELECT * FROM tbl_blog_tags
    ORDER BY id DESC;
END $$

DELIMITER ;


-- update blog tag status
DELIMITER $$
CREATE PROCEDURE sp_toggle_blog_tag_status(
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_blog_tags
    SET 
        status = CASE 
                    WHEN status = 1 THEN 0
                    ELSE 1
                 END,
        updatedBy = p_updatedBy
    WHERE id = p_id;
END $$
DELIMITER ;

-- update blog tag
DELIMITER $$
CREATE PROCEDURE sp_update_blog_tag(
    IN p_id INT,
    IN p_tag_name VARCHAR(100),
    IN p_tag_slug VARCHAR(120),
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_blog_tags
    SET 
        tag_name = COALESCE (p_tag_name, tag_name),
        tag_slug =     COALESCE (p_tag_slug, tag_slug),
        updatedBy = p_updatedBy
    WHERE id = p_id;
END $$
DELIMITER ;

-- delete blog tag
DELIMITER $$

CREATE PROCEDURE sp_delete_blog_tag(
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_blog_tags
    SET 
		status = 0,
        updatedBy = p_updatedBy
    WHERE id = p_id;
END $$

DELIMITER ;

