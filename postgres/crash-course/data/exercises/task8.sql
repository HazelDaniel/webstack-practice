-- 8. add an age column as an alias to a function to calculate the age of all cars, display both make and age

SELECT make, EXTRACT(YEAR FROM AGE(NOW(), year_created)) as age FROM cars
ORDER BY year_created DESC;
