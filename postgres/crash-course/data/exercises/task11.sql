-- 11. get the cars with 20% discount less than $3000000 select the make price and discount

SELECT make, price, ROUND(price - (price * 0.2)) as discount
	FROM cars WHERE ROUND(price - (price * 0.2)) < 3000000 ORDER BY discount DESC;
