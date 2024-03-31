-- 14. get the sum of all car prices sold each year

SELECT EXTRACT(YEAR FROM year_created) as created_year, SUM(price) FROM cars
	GROUP BY created_year ORDER BY created_year DESC;
