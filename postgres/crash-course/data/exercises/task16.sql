-- 16. make sure that no two persons can have the same email

ALTER TABLE person
ADD CONSTRAINT email_unique UNIQUE(email);
