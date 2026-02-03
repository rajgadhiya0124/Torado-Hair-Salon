CREATE TABLE tbl_leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    company VARCHAR(150),
    
    status TINYINT(1) DEFAULT 1 ,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT,
    updatedBy INT
);

-- alter table tbl_leads 
-- add  status TINYINT(1) DEFAULT 1 after company;

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


