CREATE TABLE tbl_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
	 
	category_id INT NOT NULL,
    tag_id INT NOT NULL,
    
    product_name VARCHAR(150) NOT NULL,
    product_image VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    discount_price DECIMAL(10,2) DEFAULT NULL,
    product_description TEXT,
    additional_information TEXT,
    stock INT DEFAULT 0,

	status TINYINT(1) DEFAULT 1,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT ,
    updatedBy INT,
    
    CONSTRAINT fk_product_category  FOREIGN KEY (category_id) REFERENCES tbl_product_category(id),
    CONSTRAINT fk_product_tag  FOREIGN KEY (tag_id) REFERENCES tbl_product_tags(id)
);

-- ALTER TABLE tbl_products
-- MODIFY discount_price DECIMAL(10,2) NULL DEFAULT NULL;


select * from tbl_products;

-- create product
DELIMITER $$

CREATE PROCEDURE sp_create_product (
    IN p_category_id INT,
    IN p_tag_id INT,
    IN p_product_name VARCHAR(150),
    IN p_product_image VARCHAR(255),
    IN p_price DECIMAL(10,2),
    IN p_discount_price DECIMAL(10,2),
    IN p_product_description TEXT,
    IN p_additional_information TEXT,
    IN p_stock INT,
    IN p_createdBy INT
)
BEGIN
    INSERT INTO tbl_products (
        category_id, tag_id, product_name, product_image,
        price, discount_price, product_description, additional_information, stock, createdBy, updatedBy
    )
    VALUES (
        p_category_id, p_tag_id, p_product_name, p_product_image, p_price,
        p_discount_price, p_product_description, p_additional_information, p_stock, p_createdBy, p_createdBy
    );
END$$

DELIMITER ;

-- get all products
DELIMITER $$

CREATE PROCEDURE sp_get_all_products ()
BEGIN
    SELECT 
        p.id, p.product_name, p.product_image, p.price, p.discount_price,
        p.product_description, p.additional_information, p.stock, p.status, p.createdAt,
        
        c.category_name,
        t.tag_name
        
    FROM tbl_products p
    JOIN tbl_product_category c ON p.category_id = c.id
    JOIN tbl_product_tags t ON p.tag_id = t.id
    WHERE p.status = 1
    ORDER BY p.id DESC;
END$$

DELIMITER ;


-- get product by id
DELIMITER $$

CREATE PROCEDURE sp_get_product_by_id (
    IN p_id INT
)
BEGIN
    SELECT 
        p.id, p.product_name, p.product_image, p.price, p.discount_price,
        p.product_description, p.additional_information, p.stock, p.status, p.createdAt,
        
        c.category_name,
        t.tag_name
    FROM tbl_products p
    JOIN tbl_product_category c ON p.category_id = c.id
    JOIN tbl_product_tags t ON p.tag_id = t.id
    WHERE p.id = p_id
      AND p.status = 1;
END$$

DELIMITER ;


-- update Product
DELIMITER $$

CREATE PROCEDURE sp_update_product (
    IN p_id INT,
    IN p_category_id INT,
    IN p_tag_id INT,
    IN p_product_name VARCHAR(150),
    IN p_product_image VARCHAR(255),
    IN p_price DECIMAL(10,2),
    IN p_discount_price DECIMAL(10,2),
    IN p_product_description TEXT,
    IN p_additional_information TEXT,
    IN p_stock INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_products
    SET
        category_id = 		COALESCE(p_category_id, category_id),
		tag_id = 			COALESCE(p_tag_id, tag_id),
		product_name = 		COALESCE(p_product_name, product_name),
		product_image =		COALESCE(p_product_image, product_image),
		price = 			COALESCE(p_price, price),
		discount_price = 	COALESCE(p_discount_price, discount_price),
		product_description = COALESCE(p_product_description, product_description),
		additional_information = COALESCE(p_additional_information, additional_information),
		stock = 			COALESCE(p_stock, stock),
        updatedBy = p_updatedBy
    WHERE id = p_id;
END$$

DELIMITER ;

-- delete product
DELIMITER $$

CREATE PROCEDURE sp_delete_product (
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_products
    SET
        status = 0,
        updatedBy = p_updatedBy
    WHERE id = p_id;
END$$

DELIMITER ;


