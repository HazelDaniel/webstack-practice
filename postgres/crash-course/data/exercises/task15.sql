-- 15. get the average price of a Ford car

SELECT make, AVG(price) FROM cars
	WHERE make = 'Ford' GROUP BY make;
