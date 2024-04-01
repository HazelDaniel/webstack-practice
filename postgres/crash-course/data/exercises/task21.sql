-- 21. for every person on the person table, get the person's first name
-- + their car details. anyone that doesn't have a car should have the car fields as null

SELECT person.first_name, cars.* FROM person
	LEFT JOIN cars ON person.id = cars.owner_id;
