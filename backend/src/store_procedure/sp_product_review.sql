CREATE TABLE tbl_product_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,

    product_id INT NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(150) NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 0 AND 5),
    review_message TEXT NOT NULL,

	status TINYINT(1) DEFAULT 1,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT ,
    updatedBy INT,

    FOREIGN KEY (product_id) REFERENCES tbl_products(id)
);

select * from tbl_product_reviews;

-- create product Review
DELIMITER $$

CREATE PROCEDURE sp_create_product_review(
    IN p_product_id INT,
    IN p_user_name VARCHAR(100),
    IN p_user_email VARCHAR(150),
    IN p_rating TINYINT,
    IN p_review_message TEXT,
    IN p_createdBy INT
)
BEGIN
    INSERT INTO tbl_product_reviews
    (
        product_id, user_name, user_email, rating, review_message, createdBy ,updatedBy
    )
    VALUES
    (
        p_product_id, p_user_name, p_user_email, p_rating, p_review_message, p_createdBy, p_createdBy
    );
END $$

DELIMITER ;

-- get all review

DELIMITER $$
CREATE PROCEDURE sp_getall_product_review ()
BEGIN
    SELECT
		pr.id,
        pr.user_name,
        pr.user_email,
        pr.rating,
        pr.review_message,
        pr.status,
        pr.createdAt,
        
        p.product_name
        
    FROM tbl_product_reviews pr
    JOIN tbl_products p ON p.id =  pr.product_id
    
    ORDER BY createdAt DESC;
END$$
DELIMITER ;


-- get all product review with total count and avrage raing for each product
DELIMITER $$

CREATE PROCEDURE sp_get_product_reviews_with_summary (
    IN p_product_id INT
)
BEGIN
    -- reviews
    SELECT
        user_name,
        user_email,
        rating,
        review_message,
        status,
        createdAt
    FROM tbl_product_reviews
    WHERE product_id = p_product_id
      AND status = 1
    ORDER BY createdAt DESC;

    -- summary
    SELECT
        COUNT(*) AS total_reviews,
        ROUND(AVG(rating), 1) AS average_rating
    FROM tbl_product_reviews
    WHERE product_id = p_product_id
      AND status = 1;
END$$

DELIMITER ;

-- delete product review
DELIMITER $$
CREATE PROCEDURE sp_delete_product_review (
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_product_reviews
    SET 
        status = 0,
        updatedBy = p_updatedBy
    WHERE id = p_id;
END $$
DELIMITER ;

