-- Write a solution to find the nth highest salary from the Employee table. If there is no nth highest salary, return null.
CREATE OR REPLACE FUNCTION NthHighestSalary(N INT) RETURNS INT AS $$
  DECLARE max_salary INT;
BEGIN
  SELECT MAX(salary) INTO max_salary
  FROM Employee;

  IF (SELECT COUNT(DISTINCT salary) FROM Employee) < N THEN
    RETURN NULL;
  END IF;

  RETURN (WITH with_line AS (
    SELECT ROW_NUMBER() OVER (ORDER BY e.salary DESC) AS sal_row, salary
    FROM Employee e
  )
  SELECT salary FROM with_line WHERE sal_row = N);
END;
$$ LANGUAGE plpgsql;
