-- 10. get the 2 most expensive cars sold in 2000

SELECT make, price, year_created FROM cars WHERE EXTRACT(YEAR from year_created) = 2000
 ORDER BY price DESC LIMIT 2;
