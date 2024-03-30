-- 6. show a country with the most people working at google 

SELECT country_of_birth, COUNT(*) as country_occurrence FROM PERSON
WHERE email LIKE '%@google.%' GROUP BY country_of_birth ORDER BY country_occurrence DESC
LIMIT 1;
