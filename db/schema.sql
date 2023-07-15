DROP DATABASE IF EXISTS employeeTracker;
CREATE DATABASE employeeTracker;

USE employeeTracker;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   role_title VARCHAR(30) NOT NULL,
   salary DECIMAL NOT NULL,
   deparment_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
   ON DELETE SET NULL
);

CREATE TABLE employee (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
   role_id INT,
   FOREIGN KEY (role_id)
   REFERENCES role(id),
   manager_id INT,
   FOREIGN KEY (manager_id)
   REFERENCES employee(id)
);

