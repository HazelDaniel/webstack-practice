-- 18. do not allow inserting a car that is more than 50 years old

ALTER TABLE cars
	ADD CONSTRAINT no_over_50
 CHECK (year_created >= NOW() - INTERVAL '50 YEARS');
