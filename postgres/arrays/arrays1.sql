DO
$body$
		DECLARE
			arr int[] := array[1, 2, 3];
			i int;
		BEGIN
			FOREACH i IN ARRAY arr
				LOOP
					RAISE NOTICE ' entry : %', i;
				END LOOP;
		END
$body$
LANGUAGE plpgsql
