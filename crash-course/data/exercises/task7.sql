-- 7. show a list of the most gender born in the UK

SELECT gender, COUNT(*) AS occ FROM person
WHERE country_of_birth = 'United Kingdom' GROUP BY gender ORDER BY occ DESC LIMIT 1;
