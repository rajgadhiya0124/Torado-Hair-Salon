CREATE TABLE tbl_home_hero (
    id INT AUTO_INCREMENT PRIMARY KEY,

    logo_image VARCHAR(255),
    heading_one VARCHAR(255),
    heading_two VARCHAR(255),

    hero_image VARCHAR(255),
    background_image VARCHAR(255),

    status TINYINT DEFAULT 1,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT,
    updatedBy INT
);

select * from tbl_home_hero;

-- create hero
DELIMITER $$

CREATE PROCEDURE sp_create_home_hero(
    IN p_logo_image VARCHAR(255),
    IN p_heading_one VARCHAR(255),
    IN p_heading_two VARCHAR(255),
    IN p_hero_image VARCHAR(255),
    IN p_background_image VARCHAR(255),
    IN p_createdBy INT
)
BEGIN
    INSERT INTO tbl_home_hero
    (
        logo_image, heading_one, heading_two, hero_image, background_image, createdBy, updatedBy
    )
    VALUES
    (
        p_logo_image, p_heading_one, p_heading_two, p_hero_image, p_background_image, p_createdBy, p_createdBy
    );
END $$

DELIMITER ;

-- get home hero
DELIMITER $$

CREATE PROCEDURE sp_get_home_hero()
BEGIN
    SELECT *
    FROM tbl_home_hero
    WHERE status = 1
    ORDER BY createdAt DESC
    LIMIT 1;
END $$

DELIMITER ;


-- update hero
DELIMITER $$
CREATE PROCEDURE sp_update_home_hero(
    IN p_id INT,
    IN p_logo_image VARCHAR(255),
    IN p_heading_one VARCHAR(255),
    IN p_heading_two VARCHAR(255),
    IN p_hero_image VARCHAR(255),
    IN p_background_image VARCHAR(255),
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_home_hero
    SET
		logo_image = COALESCE(p_logo_image, logo_image),
		heading_one = COALESCE(p_heading_one, heading_one),
		heading_two = COALESCE(p_heading_two, heading_two),
		hero_image = COALESCE(p_hero_image, hero_image),
		background_image = COALESCE(p_background_image, background_image),
        updatedBy = p_updatedBy
    WHERE id = p_id;
END $$
DELIMITER ;


-- delete hero
DELIMITER $$

CREATE PROCEDURE sp_delete_home_hero(
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_home_hero
    SET
        status = 0,
        updatedBy = p_updatedBy
    WHERE id = p_id;
END $$

DELIMITER ;

