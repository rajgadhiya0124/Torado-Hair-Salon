CREATE TABLE tbl_wishlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    
    status TINYINT DEFAULT 1,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT,
    updatedBy INT,
    
	CONSTRAINT fk_wishlist_product FOREIGN KEY (product_id) REFERENCES tbl_products(id),
    UNIQUE KEY unique_wishlist (user_id, product_id)
);

select * from tbl_wishlist;

-- add to wislist
DELIMITER $$
CREATE PROCEDURE sp_create_wishlist(
    IN p_user_id INT,
    IN p_product_id INT,
    IN p_createdBy INT
)
BEGIN
	 IF EXISTS (
        SELECT id FROM tbl_wishlist
        WHERE user_id = p_user_id AND product_id = p_product_id
    ) THEN

        -- Reactivate wishlist item
        UPDATE tbl_wishlist
        SET status = 1,
            updatedBy = p_createdBy
        WHERE user_id = p_user_id AND product_id = p_product_id;

    ELSE
	
    INSERT INTO tbl_wishlist (
        user_id,product_id,createdBy,updatedBy
    )
    VALUES (
        p_user_id,p_product_id,p_createdBy,p_createdBy
    );
    
    END IF;
END $$

DELIMITER ;

-- get wishlist by user
DELIMITER $$

CREATE PROCEDURE sp_get_wishlist_by_user(
    IN p_user_id INT
)
BEGIN
    SELECT 
        w.id AS wishlist_id,
        w.user_id,
        w.product_id,
		w.createdAt,
        p.product_name,
        p.product_image,
		p.price
       
    FROM tbl_wishlist w
    JOIN tbl_products p ON w.product_id = p.id
    WHERE w.user_id = p_user_id
    AND w.status = 1
    ORDER BY w.createdAt DESC;
END $$

DELIMITER ;

-- get wishlist count by user
DELIMITER $$

CREATE PROCEDURE sp_get_wishlist_count(
    IN p_user_id INT
)
BEGIN
    SELECT COUNT(*) AS count
    FROM tbl_wishlist 
    WHERE user_id = p_user_id;
END $$

DELIMITER ;


-- delete wishlist item
DELIMITER $$

CREATE PROCEDURE sp_delete_wishlist(
    IN p_user_id INT,
    IN p_product_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_wishlist
    SET 
        status = 0,
        updatedBy = p_updatedBy
    WHERE user_id = p_user_id
    AND product_id = p_product_id;
END $$

DELIMITER ;

