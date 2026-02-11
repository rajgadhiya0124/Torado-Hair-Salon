CREATE TABLE tbl_appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    persons VARCHAR(50) NOT NULL,
    appointment_date DATE NOT NULL,
    address VARCHAR(255),
    message TEXT,
	appointment_status ENUM('pending','approved','cancelled') DEFAULT 'pending',
    
	status TINYINT(1) DEFAULT 1,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT,
    updatedBy INT
);

-- ALTER TABLE tbl_appointments
-- ADD COLUMN appointment_status ENUM('pending','approved','cancelled') 
-- DEFAULT 'pending'AFTER message;

select * from tbl_appointments;

-- create a appointement
DELIMITER $$
CREATE PROCEDURE sp_create_appointment(
    IN p_customer_name VARCHAR(100),
    IN p_customer_email VARCHAR(100),
    IN p_customer_phone VARCHAR(20),
    IN p_persons VARCHAR(50),
    IN p_appointment_date DATE,
    IN p_address VARCHAR(255),
    IN p_message TEXT,
    IN p_createdBy INT
)
BEGIN
    INSERT INTO tbl_appointments ( customer_name, customer_email, customer_phone, persons, appointment_date, address, message, createdBy, updatedBy
    )
    VALUES (
        p_customer_name,
        p_customer_email,
        p_customer_phone,
        p_persons,
        p_appointment_date,
        p_address,
        p_message,
        p_createdBy,
        p_createdBy
    );
END$$
DELIMITER ;

-- get all appointments
DELIMITER $$

CREATE PROCEDURE sp_get_all_appointments()
BEGIN
    SELECT *
    FROM tbl_appointments
    WHERE status = 1
    ORDER BY appointment_date DESC;
END$$
DELIMITER ;


-- update appointment status
DELIMITER $$

CREATE PROCEDURE sp_update_appointment_status(
    IN p_id INT,
    IN p_status VARCHAR(20),
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_appointments
    SET 
        appointment_status = p_status,
        updatedBy = p_updatedBy
    WHERE id = p_id AND status = 1;
END$$

DELIMITER ;


-- delete appointment
DELIMITER $$
CREATE PROCEDURE sp_delete_appointment(
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_appointments
    SET 
        status = 0,
        updatedBy = p_updatedBy
    WHERE id = p_id;
END$$
DELIMITER ;
