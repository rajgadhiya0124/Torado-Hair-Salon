CREATE TABLE tbl_gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    serivce_name VARCHAR(150) NOT NULL,
    service_image VARCHAR(255) NOT NULL,
    
    status TINYINT(1) DEFAULT 1,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT DEFAULT NULL,
    updatedBy INT DEFAULT NULL,

    CONSTRAINT fk_gallery_category FOREIGN KEY (category_id) REFERENCES tbl_gallery_category(id)
);

select * from tbl_gallery;

-- //create gallery alter
DELIMITER $$

CREATE PROCEDURE sp_create_gallery (
    IN p_category_id INT,
    IN p_serivce_name VARCHAR(150),
    IN p_service_image VARCHAR(255),
    IN p_createdBy INT
)
BEGIN
    INSERT INTO tbl_gallery (
        category_id, serivce_name, service_image, createdBy, updatedBy
    )
    VALUES (
        p_category_id, p_serivce_name, p_service_image, p_createdBy, p_createdBy
    );
END $$

DELIMITER ;


-- get all gallery
DELIMITER $$

CREATE PROCEDURE sp_get_all_gallery ()
BEGIN
    SELECT 
        g.*,
        c.category_name
    FROM tbl_gallery g
    JOIN tbl_gallery_category c ON c.id = g.category_id
    
    ORDER BY g.createdAt DESC;
END $$

DELIMITER ;

-- get gallery by id
DELIMITER $$

CREATE PROCEDURE sp_get_gallery_by_id (
    IN p_id INT
)
BEGIN
    SELECT 
        g.*,
        c.category_name
    FROM tbl_gallery g
    JOIN tbl_gallery_category c ON c.id = g.category_id
    WHERE g.id = p_id;
END $$

DELIMITER ;	

-- update Gallery status
DELIMITER $$
CREATE PROCEDURE sp_toggle_gallery_status(
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_gallery
    SET 
        status = CASE 
                    WHEN status = 1 THEN 0
                    ELSE 1
                 END,
        updatedBy = p_updatedBy
    WHERE id = p_id;
END $$
DELIMITER ;





-- update Gallery
DELIMITER $$

CREATE PROCEDURE sp_update_gallery (
    IN p_id INT,
    IN p_category_id INT,
    IN p_serivce_name VARCHAR(150),
    IN p_service_image VARCHAR(255),
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_gallery
    SET
		category_id   = COALESCE(p_category_id, category_id),
		serivce_name  = COALESCE(p_serivce_name, serivce_name),
		service_image = COALESCE(p_service_image, service_image),
        updatedBy = p_updatedBy
    WHERE id = p_id;
END $$

DELIMITER ;



-- delete Gallery
DELIMITER $$

CREATE PROCEDURE sp_delete_gallery (
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_gallery
    SET
        status = 0,
        updatedBy = p_updatedBy
    WHERE id = p_id;
END $$

DELIMITER ;

