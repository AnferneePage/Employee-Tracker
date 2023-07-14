-- WHEN I choose to view all departments
-- THEN I am presented with a formatted 
-- table showing department names and department ids

SELECT department.department_name, department.department.id
FROM department


-- WHEN I choose to view all roles
-- THEN I am presented with the job title, 
-- role id, the department that role belongs
--  to, and the salary for that role


SELECT roles.roles_title, roles.roles.id, roles.department_name, roles.salary


-- WHEN I choose to view all employees
-- THEN I am presented with a formatted 
-- table showing employee data, including 
-- employee ids, first names, last names, 
-- job titles, departments, salaries, and
--  managers that the employees report to
