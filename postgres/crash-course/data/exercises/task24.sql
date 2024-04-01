-- 24. for every person on the person table, get the person's first_name and email + their car make (column should be car_make).
--   . anyone that doesn't have a car should not be listed
. anyone that doesn't have a car should not be listed
SELECT person.first_name, person.email, cars.make as car_make FROM person
	INNER JOIN cars ON person.id = cars.owner_id;
