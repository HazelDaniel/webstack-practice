-- 1. show a list of men working at google and group
-- them by the country they are from. columns: email , gender, country_of_birth, count

SELECT email,gender,country_of_birth, COUNT(*) FROM person
WHERE email LIKE '%@google.%'
AND gender='Male'
GROUP BY gender, email, country_of_birth
ORDER BY country_of_birth DESC;
