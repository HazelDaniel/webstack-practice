-- 4. get the number of women working at google and are in the same country

SELECT country_of_birth, COUNT(*) FROM person
WHERE gender = 'Female' AND email LIKE '%@google.%'
GROUP BY country_of_birth ORDER BY country_of_birth DESC;
