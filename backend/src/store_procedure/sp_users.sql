CREATE TABLE tbl_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    password VARCHAR(255),
	role VARCHAR(20) DEFAULT 'user',
    
	status TINYINT(1) DEFAULT 1,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT,
    updatedBy INT
);

select * from tbl_users;

-- register user or create user
DELIMITER $$
CREATE PROCEDURE sp_create_user (
	IN p_name VARCHAR(100),
    IN p_email VARCHAR(150),
    IN p_password VARCHAR(255),
    IN p_createdBy INT
)
BEGIN
	INSERT INTO tbl_users ( name, email, password, createdBy, updatedBy)
        VALUES ( p_name, p_email, p_password, p_createdBy, p_createdBy);
END $$

DELIMITER ;

-- login user
DELIMITER $$
CREATE PROCEDURE sp_login_user (
    IN p_email VARCHAR(150)
)
BEGIN
    SELECT 
        id,
        name,
        email,
        password,
        role,
        status
    FROM tbl_users
    WHERE email = p_email
      AND status = 1;
END $$
DELIMITER ;

-- get all user
DELIMITER $$
CREATE PROCEDURE sp_get_all_users ()
BEGIN
    SELECT *
    FROM tbl_users
    WHERE status = 1
    ORDER BY id DESC;
END $$
DELIMITER ;


-- delete user
DELIMITER $$
CREATE PROCEDURE sp_delete_user (
    IN p_userId INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_users
    SET status = 0,
        updatedBy = p_updatedBy
    WHERE id = p_userId;
END $$

DELIMITER ;
