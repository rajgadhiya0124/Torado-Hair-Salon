

-- get best price serivece price low to High
DELIMITER $$ 

CREATE PROCEDURE sp_get_bestprice_service () 
BEGIN 
	select * FROM tbl_salon_services
    WHERE status = 1
    ORDER BY price ASC
    LIMIT 6;
END $$

DELIMITER ; 