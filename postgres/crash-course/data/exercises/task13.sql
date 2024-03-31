-- 13. get the two most sold car models

SELECT make FROM cars
GROUP BY make ORDER BY COUNT(*)
 DESC LIMIT 2;
