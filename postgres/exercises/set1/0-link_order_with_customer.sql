CREATE OR REPLACE FUNCTION link_order_with_customer() RETURNS VOID AS
$block$
	DECLARE
		i INT DEFAULT 0;
	BEGIN
		LOOP
			UPDATE ORDERS SET
			customer_id = i WHERE order_id  = 200 - (i - 1);
			i := i + 1;
			EXIT WHEN i = 201;
		END LOOP;
	END;
$block$ LANGUAGE plpgsql;

SELECT link_order_with_customer();
