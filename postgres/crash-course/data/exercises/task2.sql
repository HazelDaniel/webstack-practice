-- 2. show a list of people working at google
-- and group them by the country they are from


SELECT email, gender, country_of_birth, count(*) FROM person
WHERE email LIKE '%@google.%'
GROUP BY country_of_birth, email, gender
ORDER BY country_of_birth DESC;
