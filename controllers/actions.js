const inquirer = require('inquirer');
const db = require('../config/connections');

function viewAllDepartments() {
  db.query('SELECT department_name, id FROM department', (err, rows) => {
    if (err) {
      console.error('An error occurred while viewing all departments:', err);
      return;
    }

    console.log('All Departments:');
    rows.forEach((department) => {
      console.log(`- Department Name: ${department.department_name}`);
      console.log(`  Department ID: ${department.id}`);
      console.log('---------------------');
    });
  });
}

function viewAllRoles() {
  db.query('SELECT role_title, role.id, department.department_name, salary FROM role JOIN department ON role.department_id = department.id', (err, rows) => {
    if (err) {
      console.error('An error occurred while viewing all roles:', err);
      return;
    }

    console.log('All Roles:');
    rows.forEach((role) => {
      console.log(`- Title: ${role.role_title}`);
      console.log(`  Role ID: ${role.id}`);
      console.log(`  Department: ${role.department_name}`);
      console.log(`  Salary: ${role.salary}`);
      console.log('---------------------');
    });
  });
}

function viewAllEmployees() {
  db.query('SELECT employee.id, first_name, last_name, role.role_title, department.department_name, salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager_name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id', (err, rows) => {
    if (err) {
      console.error('An error occurred while viewing all employees:', err);
      return;
    }

    console.log('All Employees:');
    rows.forEach((employee) => {
      console.log(`  Name: ${employee.first_name} ${employee.last_name}`);
      console.log(`  Employee ID: ${employee.id}`);
      console.log(`  Job title: ${employee.role_title}`);
      console.log(`  Department: ${employee.department_name}`);
      console.log(`  Salary: ${employee.salary}`);
      console.log(`  Manager Name: ${employee.manager_name}`);
      console.log('---------------------');
    });
  });
}

function addDepartment() {
  inquirer
    .prompt({
      name: 'departmentName',
      type: 'input',
      message: 'Enter the name of the department:',
    })
    .then((answers) => {
      const { departmentName } = answers;
      db.query('INSERT INTO department (department_name) VALUES (?)', [departmentName], (err, result) => {
        if (err) {
          console.error('An error occurred while adding a department:', err);
          return;
        }

        console.log(`Successfully added department: ${departmentName} (ID: ${result.insertId})`);
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: 'Enter the title of the role:',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'Enter the salary for the role:',
        validate: function (value) {
          const valid = !isNaN(parseFloat(value)) && parseFloat(value) >= 0;
          return valid || 'Please enter a positive number';
        },
      },
      {
        name: 'departmentId',
        type: 'input',
        message: 'Enter the department ID for the role:',
      },
    ])
    .then((answers) => {
      const { title, salary, departmentId } = answers;
      db.query(
        'INSERT INTO role (role_title, salary, department_id) VALUES (?, ?, ?)',
        [title, salary, departmentId],
        (err, result) => {
          if (err) {
            console.error('An error occurred while adding a role:', err);
            return;
          }

          console.log(`Successfully added role: ${title} (ID: ${result.insertId})`);
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: "Enter the employee's first name:",
      },
      {
        name: 'lastName',
        type: 'input',
        message: "Enter the employee's last name:",
      },
      {
        name: 'roleId',
        type: 'input',
        message: "Enter the role ID for the employee:",
      },
      {
        name: 'managerId',
        type: 'input',
        message: "Enter the manager ID for the employee:",
      },
    ])
    .then((answers) => {
      const { firstName, lastName, roleId, managerId } = answers;
      db.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
        [firstName, lastName, roleId, managerId],
        (err, result) => {
          if (err) {
            console.error('An error occurred while adding an employee:', err);
            return;
          }

          console.log(`Successfully added employee: ${firstName} ${lastName} (ID: ${result.insertId})`);
        }
      );
    });
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        name: 'employeeId',
        type: 'input',
        message: 'Enter the ID of the employee to update:',
      },
      {
        name: 'roleId',
        type: 'input',
        message: 'Enter the new role ID for the employee:',
      },
    ])
    .then((answers) => {
      const { employeeId, roleId } = answers;
      db.query(
        'UPDATE employee SET role_id = ? WHERE id = ?',
        [roleId, employeeId],
        (err, result) => {
          if (err) {
            console.error('An error occurred while updating an employee role:', err);
            return;
          }

          console.log(`Successfully updated employee's role.`);
        }
      );
    });
}

module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};


