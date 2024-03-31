-- 9. add a discount column as an alias to a function to calculate a 20% discount on all cars. display make, price and discount

SELECT make, price AS original_price
, (price - ROUND((price * 0.2), 2)) as discount FROM cars;
