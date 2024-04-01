-- 23. for every car on the cars table, get the car make +
-- the owner first name (mapping to person). All cars should
-- have owner fields (due to constraint) and you must use LEFT JOIN

SELECT cars.make, cars.price, person.first_name FROM cars
	LEFT JOIN person ON cars.owner_id = person.id;
