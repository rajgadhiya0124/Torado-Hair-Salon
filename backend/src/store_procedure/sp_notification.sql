CREATE TABLE tbl_notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    message TEXT,
    type VARCHAR(50), -- order, appointment, lead
    is_read TINYINT(1) DEFAULT 0,
    reference_id INT NULL,
    
    status TINYINT DEFAULT 1,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT,
    updatedBy INT
);

select * from tbl_notifications;

-- create notification
DELIMITER $$

CREATE PROCEDURE sp_create_notification(
    IN p_title VARCHAR(255),
    IN p_message TEXT,
    IN p_type VARCHAR(50),
    IN p_reference_id INT,
    IN p_createdBy INT
)
BEGIN
    INSERT INTO tbl_notifications(title, message, type, reference_id, createdBy, updatedBy)
    VALUES(p_title, p_message, p_type, p_reference_id, p_createdBy, p_createdBy);
END$$

DELIMITER ;

-- get all notification
DELIMITER $$

CREATE PROCEDURE sp_get_notifications()
BEGIN
    SELECT * FROM tbl_notifications
    ORDER BY id DESC
    LIMIT 10;
END$$

DELIMITER ;

-- mark as read notification
DELIMITER $$

CREATE PROCEDURE sp_mark_notification_read(
    IN p_id INT
)
BEGIN
    UPDATE tbl_notifications
    SET is_read = 1
    WHERE id = p_id;
END$$

DELIMITER ;