-- WHEN I choose to view all departments
-- THEN I am presented with a formatted 
-- table showing department names and department ids

SELECT department_name, id
FROM department;



-- WHEN I choose to view all roles
-- THEN I am presented with the job title, 
-- role id, the department that role belongs
--  to, and the salary for that role


SELECT role_title, role.id, department.department_name, salary
FROM role
JOIN department ON role.department_id = department.id;



-- WHEN I choose to view all employees
-- THEN I am presented with a formatted 
-- table showing employee data, including 
-- employee ids, first names, last names, 
-- job titles, departments, salaries, and
--  managers that the employees report to

SELECT employee.id, first_name, last_name, role.role_title, department.department_name, salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id
LEFT JOIN employee AS manager ON employee.manager_id = manager.id;

