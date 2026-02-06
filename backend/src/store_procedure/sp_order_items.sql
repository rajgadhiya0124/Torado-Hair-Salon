CREATE TABLE tbl_order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,

	status TINYINT DEFAULT 1,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT,
    updatedBy INT,

    FOREIGN KEY (order_id) REFERENCES tbl_orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES tbl_products(id) ON DELETE CASCADE
);
select * from tbl_order_items;

-- //add order items
DELIMITER $$

CREATE PROCEDURE sp_add_order_item (
    IN p_order_id INT,
    IN p_product_id INT,
    IN p_price DECIMAL(10,2),
    IN p_quantity INT,
    IN p_total DECIMAL(10,2),
    IN p_createdBy INT
)
BEGIN
    INSERT INTO tbl_order_items (
        order_id, product_id, price, quantity, total, createdBy , updatedBy
    ) VALUES (
        p_order_id, p_product_id, p_price, p_quantity, p_total, p_createdBy, p_createdBy
    );
END$$

DELIMITER ;
