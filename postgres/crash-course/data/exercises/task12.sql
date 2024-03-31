-- 12. get the cars younger than 45 years

SELECT make, EXTRACT(YEAR FROM AGE(NOW(), year_created)) AS age FROM cars
	WHERE EXTRACT(YEAR FROM AGE(NOW(), year_created)) < 45 ORDER BY age DESC;
