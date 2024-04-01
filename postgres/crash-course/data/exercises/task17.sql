-- 17. insert first_name, gender and country_of_birth into a person row with an existing email, and it must not fail

INSERT INTO person (first_name, email, gender, country_of_birth) VALUES ('Jephtah', 'jgeorgiev1@exblog.jp', 'Male', 'Ukraine')
ON CONFLICT (email) DO UPDATE SET first_name=EXCLUDED.first_name,
email=EXCLUDED.email,
gender=EXCLUDED.gender,
country_of_birth=EXCLUDED.country_of_birth;
