-- 3. get the number of men working at google and are in the same country

SELECT country_of_birth, COUNT(*) FROM person
WHERE gender = 'Male' AND email LIKE '%@google.%'
GROUP BY country_of_birth ORDER BY country_of_birth DESC;
