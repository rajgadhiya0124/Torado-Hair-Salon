CREATE TABLE tbl_blog_comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    blog_id INT NOT NULL,

    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    comment TEXT NOT NULL,

	status TINYINT(1) DEFAULT 1,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT,
    updatedBy INT,

    FOREIGN KEY (blog_id) REFERENCES tbl_blogs(id)
);

select * from tbl_blog_comments;

-- create comment
DELIMITER $$

CREATE PROCEDURE sp_create_blog_comment (
    IN p_blog_id INT,
    IN p_name VARCHAR(100),
    IN p_email VARCHAR(150),
    IN p_comment TEXT,
    IN p_createdBy INT
)
BEGIN
    INSERT INTO tbl_blog_comments (
        blog_id, name, email, comment, createdBy, updatedBy
    )
    VALUES (
        p_blog_id, p_name, p_email, p_comment, p_createdBy, p_createdBy
    );
END $$

DELIMITER ;

-- get all comment by blog id or each blog
DELIMITER $$

CREATE PROCEDURE sp_get_comments_by_blog (
    IN p_blog_id INT
)
BEGIN
    SELECT *
    FROM tbl_blog_comments
    WHERE blog_id = p_blog_id
      AND status = 1
    ORDER BY createdAt DESC;
END $$

DELIMITER ;


-- delete comment
DELIMITER $$

CREATE PROCEDURE sp_delete_blog_comment (
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_blog_comments
    SET 
		status = 0,
        updatedBy = p_updatedBy
    WHERE id = p_id;
END $$

DELIMITER ;

