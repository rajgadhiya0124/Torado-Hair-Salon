CREATE TABLE tbl_salon_services (
    id INT AUTO_INCREMENT PRIMARY KEY,

    service_name VARCHAR(255) NOT NULL,
    service_icon VARCHAR(255),
    service_image VARCHAR(255),
	price DECIMAL(10,2) NOT NULL,
    
    service_video VARCHAR(255),            -- video URL
    service_video_bg VARCHAR(255),         -- background image for video modal

    service_description TEXT,
    is_top TINYINT(1) DEFAULT 0,

    status TINYINT(1) DEFAULT 1,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT,
    updatedBy INT
);

-- ALTER TABLE tbl_salon_services 
-- ADD is_top TINYINT(1) DEFAULT 0 AFTER service_description;

select * from tbl_salon_services;

-- create service
DELIMITER $$

CREATE PROCEDURE sp_create_service (
    IN p_service_name VARCHAR(255),
    IN p_service_icon VARCHAR(255),
    IN p_service_image VARCHAR(255),
    IN p_price DECIMAL(10,2),
    IN p_service_video VARCHAR(255),
    IN p_service_video_bg VARCHAR(255),
    IN p_service_description TEXT,
    IN p_createdBy INT
)
BEGIN
    INSERT INTO tbl_salon_services
    (
        service_name,
        service_icon,
        service_image,
        price,
        service_video,
        service_video_bg,
        service_description,
        createdBy, updatedBy
    )
    VALUES
    (
        p_service_name,
        p_service_icon,
        p_service_image,
        p_price,
        p_service_video,
        p_service_video_bg,
        p_service_description,
        p_createdBy, p_createdBy
    );
END $$

DELIMITER ;


-- get All services
DELIMITER $$

CREATE PROCEDURE sp_get_all_services ()
BEGIN
    SELECT *
    FROM tbl_salon_services
    ORDER BY createdAt DESC;
END $$

DELIMITER ;

-- get service by id or single service
DELIMITER $$

CREATE PROCEDURE sp_get_service_by_id (
    IN p_id INT
)
BEGIN
    SELECT *
    FROM tbl_salon_services
    WHERE id = p_id
      AND status = 1;
END $$

DELIMITER ;


-- update Service status
DELIMITER $$
CREATE PROCEDURE sp_toggle_service_status(
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_salon_services
    SET 
        status = CASE 
                    WHEN status = 1 THEN 0
                    ELSE 1
                 END,
        updatedBy = p_updatedBy
    WHERE id = p_id;
END $$
DELIMITER ;


-- update service
DELIMITER $$

CREATE PROCEDURE sp_update_service (
    IN p_id INT,
    IN p_service_name VARCHAR(255),
    IN p_service_icon VARCHAR(255),
    IN p_service_image VARCHAR(255),
    IN p_price DECIMAL(10,2),
    IN p_service_video VARCHAR(255),
    IN p_service_video_bg VARCHAR(255),
    IN p_service_description TEXT,
	IN p_is_top TINYINT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_salon_services
    SET
        service_name        = COALESCE(p_service_name, service_name),
		service_icon        = COALESCE(p_service_icon, service_icon),
		service_image       = COALESCE(p_service_image, service_image),
		price               = COALESCE(p_price, price),
		service_video       = COALESCE(p_service_video, service_video),
		service_video_bg    = COALESCE(p_service_video_bg, service_video_bg),
		service_description = COALESCE(p_service_description, service_description),
        is_top              = COALESCE(p_is_top, is_top),

        updatedBy = p_updatedBy
    WHERE id = p_id;
END $$

DELIMITER ;

-- delete service
DELIMITER $$

CREATE PROCEDURE sp_delete_service (
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE  tbl_salon_services
		SET 
		status = 0,
        updatedBy = p_updatedBy
        
		WHERE id = p_id;
END $$

DELIMITER ;


-- get top services
DELIMITER $$

CREATE PROCEDURE sp_get_top_services()
BEGIN
    SELECT *
    FROM tbl_salon_services
    WHERE is_top = 1
      AND status = 1
    ORDER BY createdAt DESC
    LIMIT 5;
END $$

DELIMITER ;

