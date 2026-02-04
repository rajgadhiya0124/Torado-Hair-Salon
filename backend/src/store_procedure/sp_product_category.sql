CREATE TABLE tbl_product_category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
	category_slug VARCHAR(150) UNIQUE,
    
    status TINYINT(1) DEFAULT 1,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT DEFAULT NULL,
    updatedBy INT DEFAULT NULL
);

select * from tbl_product_category;

-- create product category
DELIMITER $$

CREATE PROCEDURE sp_create_product_category (
    IN p_category_name VARCHAR(100),
    IN p_category_slug VARCHAR(150),
    IN p_createdBy INT
)
BEGIN
    INSERT INTO tbl_product_category (
        category_name, category_slug, createdBy, updatedBy
    )
    VALUES (
        p_category_name, p_category_slug, p_createdBy, p_createdBy
    );
END$$

DELIMITER ;


-- get All product category
DELIMITER $$
CREATE PROCEDURE sp_get_all_product_category ()
BEGIN
    SELECT 
        id,
        category_name,
        category_slug,
        status,
        createdAt
    FROM tbl_product_category
    WHERE status = 1
    ORDER BY id DESC;
END$$
DELIMITER ;


-- update product category
DELIMITER $$

CREATE PROCEDURE sp_update_product_category (
    IN p_id INT,
    IN p_category_name VARCHAR(100),
    IN p_category_slug VARCHAR(150),
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_product_category
    SET
        category_name = COALESCE(p_category_name, category_name),
        category_slug = COALESCE(p_category_slug, category_slug),
        updatedBy = p_updatedBy
    WHERE id = p_id;
END$$

DELIMITER ;

-- delete product category
DELIMITER $$

CREATE PROCEDURE sp_delete_product_category (
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_product_category
    SET
        status = 0,
        updatedBy = p_updatedBy
    WHERE id = p_id;
END$$

DELIMITER ;



