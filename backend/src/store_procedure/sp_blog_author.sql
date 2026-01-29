CREATE TABLE tbl_blog_authors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(100) NOT NULL,
    author_image VARCHAR(255),
    author_bio TEXT,

    status TINYINT(1) DEFAULT 1,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT,
    updatedBy INT
);

select * from tbl_blog_authors;

-- create auhtor 
DELIMITER $$

CREATE PROCEDURE sp_create_blog_author (
    IN p_author_name VARCHAR(100),
    IN p_author_image VARCHAR(255),
    IN p_author_bio TEXT,
    IN p_createdBy INT
)
BEGIN
    INSERT INTO tbl_blog_authors (
        author_name, author_image, author_bio, createdBy, updatedBy
    ) VALUES (
        p_author_name, p_author_image, p_author_bio, p_createdBy, p_createdBy
    );
END$$

DELIMITER ;

-- get all author
DELIMITER $$

CREATE PROCEDURE sp_get_all_blog_authors ()
BEGIN
    SELECT
        id, author_name, author_image, author_bio,
        status, createdAt, updatedAt
    FROM tbl_blog_authors
    WHERE status = 1
    ORDER BY id DESC;
END$$

DELIMITER ;

-- update blog author
DELIMITER $$

CREATE PROCEDURE sp_update_blog_author (
    IN p_id INT,
    IN p_author_name VARCHAR(100),
    IN p_author_image VARCHAR(255),
    IN p_author_bio TEXT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_blog_authors
    SET
        author_name = COALESCE(p_author_name , author_name),
        author_image = COALESCE(p_author_image, author_image),
        author_bio = COALESCE(p_author_bio , author_bio),
        updatedBy = p_updatedBy
    WHERE id = p_id
      AND status = 1;
END$$

DELIMITER ;

-- delete blog author
DELIMITER $$

CREATE PROCEDURE sp_delete_blog_author (
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_blog_authors
    SET
        status = 0,
        updatedBy = p_updatedBy
    WHERE id = p_id;
END$$

DELIMITER ;


