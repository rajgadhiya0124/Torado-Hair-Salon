CREATE TABLE tbl_leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    company VARCHAR(150),
    lead_status ENUM('new','contacted','closed') DEFAULT 'new',
    
    status TINYINT(1) DEFAULT 1 ,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT,
    updatedBy INT
);

-- alter table tbl_leads 
-- add  status TINYINT(1) DEFAULT 1 after company;

-- ALTER TABLE tbl_leads
-- ADD lead_status ENUM('new','contacted','closed') DEFAULT 'new' AFTER company;

select * from  tbl_leads;

-- create lead 
DELIMITER $$

CREATE PROCEDURE sp_create_lead (
    IN p_user_name VARCHAR(100),
    IN p_email VARCHAR(150),
    IN p_company VARCHAR(150),
    IN p_createdBy INT
)
BEGIN
    INSERT INTO tbl_leads (user_name, email, company, createdBy , updatedBy)
    VALUES (
        p_user_name, p_email, p_company, p_createdBy, p_createdBy
    );
END $$

DELIMITER ;


-- //get all lead details
DELIMITER $$

CREATE PROCEDURE sp_get_all_leads ()
BEGIN
    SELECT *
    FROM tbl_leads
    ORDER BY createdAt DESC;
END $$

DELIMITER ;

-- update lead staus active/ deactive
DELIMITER $$
CREATE PROCEDURE sp_toggle_lead_status(
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_leads
    SET 
        status = CASE 
                    WHEN status = 1 THEN 0
                    ELSE 1
                 END,
        updatedBy = p_updatedBy
    WHERE id = p_id;
END $$
DELIMITER ;


-- update lead status
DELIMITER $$
CREATE PROCEDURE sp_update_lead_status (
	IN p_id INT,
    IN p_lead_status ENUM('new','contacted','closed'),
    IN p_updatedBy INT
)
BEGIN 
	UPDATE tbl_leads
    SET 
		lead_status = p_lead_status,
		updatedBy = p_updatedBy
	WHERE id = p_id;
END $$

DELIMITER ;


-- delete lead
DELIMITER $$

CREATE PROCEDURE sp_delete_lead (
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_leads
		SET status = 0,
			updatedBy = p_updatedBy
    WHERE id = p_id;
END $$

DELIMITER ;


