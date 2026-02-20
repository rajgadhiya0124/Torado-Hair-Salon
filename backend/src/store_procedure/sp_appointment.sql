CREATE TABLE tbl_appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    persons VARCHAR(50) NOT NULL,
    service_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    address VARCHAR(255),
    message TEXT,
	appointment_status ENUM('pending','approved','cancelled') DEFAULT 'pending',
    
	status TINYINT(1) DEFAULT 1,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT,
    updatedBy INT,
    
    CONSTRAINT fk_service FOREIGN KEY (service_id) REFERENCES tbl_salon_services(id)
);

-- ALTER TABLE tbl_appointments
-- ADD appointment_time TIME NOT NULL AFTER appointment_date;

-- ALTER TABLE tbl_appointments
-- ADD service_id INT NOT NULL AFTER persons;

-- ALTER TABLE tbl_appointments
-- ADD CONSTRAINT fk_service
-- FOREIGN KEY (service_id) REFERENCES tbl_salon_services(id);

select * from tbl_appointments;

-- create a appointement
DELIMITER $$
CREATE PROCEDURE sp_create_appointment(
    IN p_customer_name VARCHAR(100),
    IN p_customer_email VARCHAR(100),
    IN p_customer_phone VARCHAR(20),
    IN p_persons VARCHAR(50),
    IN p_service_id INT,
    IN p_appointment_date DATE,
    IN p_appointment_time TIME,
    IN p_address VARCHAR(255),
    IN p_message TEXT,
    IN p_createdBy INT
)
BEGIN
    INSERT INTO tbl_appointments 
	( 	customer_name, customer_email, customer_phone, persons,service_id, 
		appointment_date,appointment_time, address, message, createdBy, updatedBy
    )
    VALUES (
        p_customer_name,
        p_customer_email,
        p_customer_phone,
        p_persons,
        p_service_id,
        p_appointment_date,
        p_appointment_time,
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
    SELECT 
			a.*,
            s.service_name
    FROM tbl_appointments a
    LEFT JOIN tbl_salon_services s ON s.id = a.service_id 
    WHERE a.status = 1
    ORDER BY a.createdAt DESC;
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
