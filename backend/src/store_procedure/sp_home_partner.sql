CREATE TABLE tbl_home_partners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    partner_image VARCHAR(255) NOT NULL,

    status TINYINT(1) DEFAULT 1,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT,
    updatedBy INT
);

select * from tbl_home_partners;


-- create parnter
DELIMITER $$
CREATE PROCEDURE sp_create_home_partner (
    IN p_partner_image VARCHAR(255),
    IN p_createdBy INT
     
)
BEGIN
    INSERT INTO tbl_home_partners (
        partner_image, createdBy, updatedBy
    )
    VALUES (
        p_partner_image, p_createdBy, p_createdBy
    );
END$$
DELIMITER ;


-- get all parnter
DELIMITER $$
CREATE PROCEDURE sp_get_home_partners ()
BEGIN
    SELECT 
        id,
        partner_image,
        createdAt
    FROM tbl_home_partners
    WHERE status = 1
    ORDER BY createdAt DESC;
END$$
DELIMITER ;

-- delete bhome partner
DELIMITER $$
CREATE PROCEDURE sp_delete_home_partner (
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_home_partners
    SET 
        status = 0,
        updatedBy = p_updatedBy
    WHERE id = p_id;
END$$
DELIMITER ;

