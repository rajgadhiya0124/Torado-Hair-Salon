CREATE TABLE tbl_product_tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(50) NOT NULL,
	tag_slug VARCHAR(150) UNIQUE,
    
    status TINYINT(1) DEFAULT 1,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT DEFAULT NULL,
    updatedBy INT DEFAULT NULL
);

select * from tbl_product_tags;

-- create product tag
DELIMITER $$

CREATE PROCEDURE sp_add_product_tag (
    IN p_tag_name VARCHAR(50),
    IN p_tag_slug VARCHAR(150),
    IN p_createdBy INT
)
BEGIN
        INSERT INTO tbl_product_tags (
            tag_name, tag_slug, createdBy, updatedBy
        )
        VALUES (
            p_tag_name, p_tag_slug, p_createdBy, p_createdBy
        );
END$$

DELIMITER ;


-- get all product category
DELIMITER $$

CREATE PROCEDURE sp_get_product_tags ()
BEGIN
    SELECT 
        id,
        tag_name,
        tag_slug,
        status,
        createdAt
    FROM tbl_product_tags
    WHERE status = 1
    ORDER BY id DESC;
END$$

DELIMITER ;


-- update product tag
DELIMITER $$

CREATE PROCEDURE sp_update_product_tag (
    IN p_id INT,
    IN p_tag_name VARCHAR(50),
    IN p_tag_slug VARCHAR(150),
    IN p_updatedBy INT
)
BEGIN
	UPDATE tbl_product_tags
	SET
		tag_name = COALESCE(p_tag_name, tag_name),
		tag_slug = COALESCE(p_tag_slug, p_tag_slug),
		updatedBy = p_updatedBy
	WHERE id = p_id;
END$$

DELIMITER ;

-- delete product tag
DELIMITER $$

CREATE PROCEDURE sp_delete_product_tag (
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_product_tags
    SET status = 0,
		updatedBy = p_updatedBy
    WHERE id = p_id;
END$$

DELIMITER ;

