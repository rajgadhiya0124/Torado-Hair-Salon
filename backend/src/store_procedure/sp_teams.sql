CREATE TABLE tbl_team_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    person_name VARCHAR(100) NOT NULL,
    person_image VARCHAR(255) NOT NULL,
    person_role VARCHAR(100) NOT NULL,

    status TINYINT(1) DEFAULT 1,

    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT,
    updatedBy INT
);

select * from tbl_team_members;

-- create team member
DELIMITER $$

CREATE PROCEDURE sp_create_team_member (
    IN p_person_name VARCHAR(100),
    IN p_person_image VARCHAR(255),
    IN p_person_role VARCHAR(100),
    IN p_createdBy INT
)
BEGIN
    INSERT INTO tbl_team_members (
        person_name, person_image, person_role, createdBy, updatedBy
    )
    VALUES (
        p_person_name, p_person_image, p_person_role, p_createdBy, p_createdBy
    );
END $$
DELIMITER ;

-- get All team member
DELIMITER $$

CREATE PROCEDURE sp_get_team_members ()
BEGIN
    SELECT
        id,
        person_name,
        person_image,
        person_role
    FROM tbl_team_members
    WHERE status = 1
    ORDER BY createdAt DESC;
END $$

DELIMITER ;


-- get team member by id
DELIMITER $$
CREATE PROCEDURE sp_get_team_member_by_id (
    IN p_id INT
)
BEGIN
    SELECT *
    FROM tbl_team_members
    WHERE id = p_id
      AND status = 1;
END $$
DELIMITER ;

-- update team member 
DELIMITER $$

CREATE PROCEDURE sp_update_team_member (
    IN p_id INT,
    IN p_person_name VARCHAR(100),
    IN p_person_image VARCHAR(255),
    IN p_person_role VARCHAR(100),
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_team_members
    SET
		person_name  = COALESCE(p_person_name, person_name),
		person_image = COALESCE(p_person_image, person_image),
		person_role  = COALESCE(p_person_role, person_role),

        updatedBy = p_updatedBy
    WHERE id = p_id;
END $$

DELIMITER ;

-- delete team member
DELIMITER $$

CREATE PROCEDURE sp_delete_team_member (
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_team_members
    SET
        status = 0,
        updatedBy = p_updatedBy
    WHERE id = p_id;
END $$

DELIMITER ;

