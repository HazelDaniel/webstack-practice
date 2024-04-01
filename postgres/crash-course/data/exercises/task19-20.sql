-- 24. change the primary keys to a UUID4 generated identifier on both tables
-- . using loops, make sure that each row in the person table has a car in the cars table

ALTER TABLE cars
	ADD COLUMN id UUID DEFAULT uuid_generate_v4();

ALTER TABLE person
	ADD COLUMN car_id UUID;

ALTER TABLE person
	ADD CONSTRAINT fk_car_rel
	FOREIGN KEY (car_id) REFERENCES cars(id)
	ON DELETE SET NULL;

CREATE OR REPLACE FUNCTION link_person_car() RETURNS VOID AS $$
declare
	car record;
	next_seq INT;
BEGIN
	ALTER SEQUENCE hazel_seq RESTART WITH 1;
	
	FOR car IN SELECT id FROM cars ORDER BY id
		LOOP
			next_seq := NEXTVAL('hazel_seq');
			RAISE NOTICE 'The car id: %, current value is %', car.id, next_seq;
			UPDATE person SET car_id = car.id WHERE id = next_seq;
		END LOOP;
END;
$$ LANGUAGE plpgsql;

SELECT link_person_car();

ALTER TABLE person
	DROP COLUMN id;

ALTER TABLE person
	ADD COLUMN id UUID PRIMARY KEY
	DEFAULT uuid_generate_v4();

ALTER TABLE cars
	ADD COLUMN owner_id UUID;

ALTER TABLE cars
	ADD CONSTRAINT fk_person_rel
	FOREIGN KEY (owner_id) REFERENCES person(id)
	ON DELETE SET NULL;

CREATE OR REPLACE FUNCTION link_car_person() RETURNS VOID AS $$
DECLARE
	person_record record;
BEGIN
	FOR person_record IN SELECT id, car_id FROM person
		LOOP
			UPDATE cars SET owner_id = person_record.id WHERE id = person_record.car_id;
		END LOOP;
END;
$$ LANGUAGE plpgsql;

SELECT link_car_person();

ALTER TABLE cars
	ADD CONSTRAINT unique_owner_rel UNIQUE(owner_id);

DELETE FROM cars WHERE owner_id IS NULL;

ALTER TABLE cars
	ADD CONSTRAINT check_owner_rel CHECK (owner_id IS NOT NULL)
