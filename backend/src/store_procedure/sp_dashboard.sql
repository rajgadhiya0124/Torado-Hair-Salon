
-- count data for dashboard card
DELIMITER $$

CREATE PROCEDURE sp_get_dashboard_counts()
BEGIN
    SELECT 
        (SELECT COUNT(*) FROM tbl_blogs WHERE status = 1) AS total_blogs,
        (SELECT COUNT(*) FROM tbl_team_members WHERE status = 1) AS total_team_members,
        (SELECT COUNT(*) FROM tbl_appointments WHERE status = 1) AS total_appointments,
        (SELECT COUNT(*) FROM tbl_products WHERE status = 1) AS total_products,
        (SELECT COUNT(*) FROM tbl_orders WHERE status = 1) AS total_orders,
        (SELECT COUNT(*) FROM tbl_users WHERE status = 1) AS total_users,
        (SELECT COUNT(*) FROM tbl_leads WHERE status = 1) AS total_leads,
        (SELECT COUNT(*) FROM tbl_newsletter WHERE status = 1) AS total_newsletter,
        (SELECT COUNT(*) FROM tbl_home_partners WHERE status = 1) AS total_partners;

END $$

DELIMITER ;

-- get weekly appointment
DELIMITER $$

CREATE PROCEDURE sp_get_weekly_appointments()
BEGIN 
	SELECT 
		  WEEK(appointment_date) AS week_number,
          COUNT(*) AS total_appointments
	FROM tbl_appointments
    WHERE status = 1
    GROUP BY WEEK(appointment_date)
	ORDER BY week_number DESC
    LIMIT 4;     -- last 4 week 
END $$

DELIMITER ;

-- get montly order
DELIMITER $$

CREATE PROCEDURE sp_get_monthly_order()
BEGIN 
	SELECT 
		MONTH(createdAt) AS month_number,
		DATE_FORMAT(createdAt, '%b') AS month_name,
		COUNT(*) AS total_orders
	FROM tbl_orders
	WHERE YEAR(createdAt) = YEAR(CURDATE())
	  AND status = 1
	GROUP BY MONTH(createdAt), DATE_FORMAT(createdAt, '%b')
	ORDER BY MONTH(createdAt);
END $$

DELIMITER ;

-- get today appointment 
DELIMITER $$

CREATE PROCEDURE sp_get_today_appointments ()
BEGIN 
	SELECT  a.*,
			s.service_name
            
	FROM tbl_appointments a 
    LEFT JOIN tbl_salon_services s ON s.id = a.service_id
    
    WHERE DATE(appointment_date) = CURDATE()
		AND a.status = 1 
	ORDER BY createdAt ASC;
END $$
DELIMITER ;
            

-- get recent order
DELIMITER $$

CREATE PROCEDURE sp_get_recent_ordes ()
BEGIN 
	SELECT *, DATE_FORMAT(createdAt, '%Y-%m-%d') AS order_date
			
    FROM tbl_orders
    WHERE status = 1
    ORDER BY createdAt DESC
    LIMIT 5;
END $$

DELIMITER ;
            
-- get recent leads 
DELIMITER $$
CREATE PROCEDURE sp_get_recent_leads()
BEGIN
    SELECT 
        id,
        user_name,
        email,
        company,
        lead_status,
        DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i') AS lead_date
    FROM tbl_leads
    ORDER BY createdAt DESC
    LIMIT 5;
END $$

DELIMITER ;
            
            