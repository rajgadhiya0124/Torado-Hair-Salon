CREATE TABLE tbl_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR (255),
    email VARCHAR(150),
    phone VARCHAR(20),
    company_name VARCHAR(80) DEFAULT NULL,
    country VARCHAR(100),
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    zip VARCHAR(100),
    order_notes TEXT,
    
    total_amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('bank_transfer','cod','paypal') DEFAULT 'cod',
    payment_status ENUM('pending','paid','failed') DEFAULT 'pending',
    order_status ENUM('pending','confirmed','shipped','delivered','cancelled') DEFAULT 'pending',

    status TINYINT(1) DEFAULT 1,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT ,
    updatedBy INT	
);

select * from tbl_orders;

-- SET FOREIGN_KEY_CHECKS = 0;

-- TRUNCATE TABLE tbl_order_items;
-- TRUNCATE TABLE tbl_orders;

-- SET FOREIGN_KEY_CHECKS = 1;

-- //create order
DELIMITER $$

CREATE PROCEDURE sp_create_order (
    IN p_user_id INT,
    IN p_first_name VARCHAR(255),
    IN p_last_name VARCHAR(255),
    IN p_email VARCHAR(150),
    IN p_phone VARCHAR(20),
    IN p_company_name VARCHAR(80),
    IN p_country VARCHAR(100),
    IN p_address VARCHAR(255),
    IN p_city VARCHAR(100),
    IN p_state VARCHAR(100),
    IN p_zip VARCHAR(100),
    IN p_order_notes TEXT,
    IN p_total_amount DECIMAL(10,2),
	IN p_payment_method VARCHAR(50),
    IN p_createdBy INT
)
BEGIN

    INSERT INTO tbl_orders (
        user_id, first_name, last_name, email, phone, company_name,
        country, address, city, state, zip, order_notes,
        total_amount, payment_method, createdBy, updatedBy
    ) VALUES (
        p_user_id, p_first_name, p_last_name, p_email, p_phone, p_company_name,
        p_country, p_address, p_city, p_state, p_zip, p_order_notes,
        p_total_amount, p_payment_method, p_createdBy, p_createdBy
    );
    
    SELECT LAST_INSERT_ID() AS id;
END$$

DELIMITER ;


-- get All Order
DELIMITER $$
CREATE PROCEDURE sp_get_all_orders ()
BEGIN
    SELECT * FROM tbl_orders

    ORDER BY createdAt DESC;
END$$

DELIMITER ;


-- //get order by id
DELIMITER $$

CREATE PROCEDURE sp_get_order_by_id (
    IN p_order_id INT
)
BEGIN
    SELECT * FROM tbl_orders 
    WHERE id = p_order_id AND status = 1;

    SELECT 
        oi.*, 
        p.product_name, 
        p.product_image
    FROM tbl_order_items oi
    JOIN tbl_products p ON p.id = oi.product_id
    WHERE oi.order_id = p_order_id;
END$$

DELIMITER ;


-- update Order status
DELIMITER $$
CREATE PROCEDURE sp_toggle_order_status(
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_orders
    SET 
        status = CASE 
                    WHEN status = 1 THEN 0
                    ELSE 1
                 END,
        updatedBy = p_updatedBy
    WHERE id = p_id;
END $$
DELIMITER ;


-- update order
DELIMITER $$

CREATE PROCEDURE sp_update_order (
    IN p_order_id INT,
	IN p_payment_status ENUM('pending','paid','failed'),
    IN p_order_status ENUM('pending','confirmed','shipped','delivered','cancelled'),
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_orders
    SET 
		payment_status = COALESCE(p_payment_status, payment_status),
        order_status = COALESCE(p_order_status, order_status),
        updatedBy = p_updatedBy
    WHERE id = p_order_id;
END$$

DELIMITER ;

-- delete order
DELIMITER $$

CREATE PROCEDURE sp_delete_order (
    IN p_order_id INT
)
BEGIN
    UPDATE tbl_orders 
    SET status = 0
    WHERE id = p_order_id;
END$$

DELIMITER ;

