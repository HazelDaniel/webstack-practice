-- 22. for every car on the cars table, get the car make and price + their owner details (mapping to person). anyone that doesn't have an owner should not be listed

SELECT cars.make, cars.price, person.* FROM cars
	INNER JOIN person ON cars.owner_id = person.id;
