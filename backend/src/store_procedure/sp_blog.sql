CREATE TABLE tbl_blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    tag_id INT NOT NULL,
    author_id INT NOT NULL,
    
    blog_title VARCHAR(255) NOT NULL,
    blog_image VARCHAR(255),
    blog_date DATE NOT NULL,
    content TEXT,
    views INT DEFAULT 0,

    status TINYINT(1) DEFAULT 1,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT,
    updatedBy INT,

    FOREIGN KEY (category_id) REFERENCES tbl_blog_categories(id),
    FOREIGN KEY (tag_id) REFERENCES tbl_blog_tags(id),
	FOREIGN KEY (author_id) REFERENCES tbl_blog_authors(id)
);

select * from tbl_blogs;

-- create blog
DELIMITER $$

CREATE PROCEDURE sp_create_blog (
    IN p_category_id INT,
    IN p_tag_id INT,
    IN p_author_id INT,
    IN p_blog_title VARCHAR(255),
    IN p_blog_image VARCHAR(255),
    IN p_blog_date DATE,
    IN p_content TEXT,
    IN p_createdBy INT
)
BEGIN
    INSERT INTO tbl_blogs (
        category_id,tag_id,author_id, blog_title, 
        blog_image,blog_date, content, createdBy, updatedBy
    ) VALUES (
        p_category_id, p_tag_id, p_author_id, p_blog_title,
        p_blog_image, p_blog_date, p_content, p_createdBy, p_createdBy
    );
END$$

DELIMITER ;


-- get all blog
DELIMITER $$

CREATE PROCEDURE sp_get_all_blogs ()
BEGIN
    SELECT
        b.id, b.blog_title, b.blog_image,
        DATE_FORMAT(b.blog_date, '%Y-%m-%d') AS blog_date, 
        b.createdAt,
        b.content, 
        b.status,
        
        c.id AS category_id,
        c.category_name,
        
        t.id AS tag_id,
        t.tag_name,
        
        a.id AS author_id,
        a.author_name

    FROM tbl_blogs b
    LEFT JOIN tbl_blog_categories c ON b.category_id = c.id
    LEFT JOIN tbl_blog_tags t ON b.tag_id = t.id
    LEFT JOIN tbl_blog_authors a ON b.author_id = a.id
    WHERE b.status = 1
    ORDER BY b.id DESC;
END$$

DELIMITER ;

-- get blog by id or single blog
DELIMITER $$

CREATE PROCEDURE sp_get_blog_by_id (
    IN p_id INT
)
BEGIN
    SELECT
        b.id,
        b.blog_title, b.blog_image,
        DATE_FORMAT(b.blog_date, '%Y-%m-%d') AS blog_date,
		b.content,
        
        c.id AS category_id,
        c.category_name,
        
        t.id AS tag_id,
        t.tag_name,
        
        a.id AS author_id,
        a.author_name,
        a.author_image,
        a.author_bio
        
    FROM tbl_blogs b
    JOIN tbl_blog_categories c ON b.category_id = c.id
    JOIN tbl_blog_tags t ON b.tag_id = t.id
    JOIN tbl_blog_authors a ON b.author_id = a.id
    WHERE b.id = p_id
      AND b.status = 1;
END$$

DELIMITER ;

-- update blog
DELIMITER $$

CREATE PROCEDURE sp_update_blog (
    IN p_id INT,
    IN p_category_id INT,
    IN p_tag_id INT,
    IN p_author_id INT,
    IN p_blog_title VARCHAR(255),
    IN p_blog_image VARCHAR(255),
    IN p_blog_date DATE,
    IN p_content TEXT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_blogs
    SET
        category_id = COALESCE(p_category_id, category_id),
		tag_id      = COALESCE(p_tag_id, tag_id),
		author_id   = COALESCE(p_author_id, author_id),
		blog_title  = COALESCE(p_blog_title, blog_title),
		blog_image  = COALESCE(p_blog_image, blog_image),
		blog_date   = COALESCE(p_blog_date, blog_date),
		content     = COALESCE(p_content, content),
        updatedBy = p_updatedBy
    WHERE id = p_id
      AND status = 1;
END$$

DELIMITER ;

-- delete blog
DELIMITER $$

CREATE PROCEDURE sp_delete_blog (
    IN p_id INT,
    IN p_updatedBy INT
)
BEGIN
    UPDATE tbl_blogs
    SET
        status = 0,
        updatedBy = p_updatedBy
    WHERE id = p_id;
END$$

DELIMITER ;


-- get blog by category or category id
DELIMITER $$

CREATE PROCEDURE sp_get_blogs_by_category (
    IN p_category_id INT
)
BEGIN
    SELECT 
		b.id, b.blog_title, b.blog_image,
        DATE_FORMAT(b.blog_date, '%Y-%m-%d') AS blog_date, 
        b.createdAt,
        b.content, 
        b.status,
        
        c.id AS category_id,
        c.category_name,
        
        t.id AS tag_id,
        t.tag_name,
        
        a.id AS author_id,
        a.author_name
        
    FROM tbl_blogs b
	LEFT JOIN tbl_blog_categories c ON b.category_id = c.id
	LEFT JOIN tbl_blog_tags t ON b.tag_id = t.id
    LEFT JOIN tbl_blog_authors a ON b.author_id = a.id
    
    WHERE category_id = p_category_id
      AND b.status = 1
    ORDER BY blog_date DESC;
END $$

DELIMITER ;


-- get blog by tag or tag id
DELIMITER $$

CREATE PROCEDURE sp_get_blogs_by_tag (
    IN p_tag_id INT
)
BEGIN
    SELECT 
		b.id, b.blog_title, b.blog_image,
        DATE_FORMAT(b.blog_date, '%Y-%m-%d') AS blog_date, 
        b.createdAt,
        b.content, 
        b.status,
        
        c.id AS category_id,
        c.category_name,
        
        t.id AS tag_id,
        t.tag_name,
        
        a.id AS author_id,
        a.author_name
        
    FROM tbl_blogs b
	LEFT JOIN tbl_blog_categories c ON b.category_id = c.id
	LEFT JOIN tbl_blog_tags t ON b.tag_id = t.id
    LEFT JOIN tbl_blog_authors a ON b.author_id = a.id

    WHERE b.tag_id = p_tag_id
      AND b.status = 1
    ORDER BY blog_date DESC;
END $$

DELIMITER ;

