const db = require('../config/db');
const inquirer = require('inquirer');
const Department = require('../db/schemas/department');
const Role = require('../db/schemas/role');
const Employee = require('../db/schemas/employee');

function viewAllDepartments() {
  db.query('SELECT * FROM departments', (err, rows) => {
    if (err) {
      console.error('An error occurred while viewing all departments:', err);
      return;
    }

    console.log('All Departments:');
    rows.forEach((department) => {
      console.log(`- Department Name: ${department.name}`);
      console.log(`  Department ID: ${department.id}`);
      console.log('---------------------');
    });
  });
}

function viewAllRoles() {
  db.query('SELECT * FROM roles', (err, rows) => {
    if (err) {
      console.error('An error occurred while viewing all roles:', err);
      return;
    }

    console.log('All Roles:');
    rows.forEach((role) => {
      console.log(`- Title: ${role.title}`);
      console.log(`  Role ID: ${role.id}`);
      console.log(`  Department: ${role.department}`);
      console.log(`  Salary: ${role.salary}`);
      console.log('---------------------');
    });
  });
}

function viewAllEmployees() {
  db.query('SELECT * FROM employees', (err, rows) => {
    if (err) {
      console.error('An error occurred while viewing all employees:', err);
      return;
    }

    console.log('All Employees:');
    rows.forEach((employee) => {
      console.log(`  Name: ${employee.firstName} ${employee.lastName}`);
      console.log(`  Employee ID: ${employee.id}`);
      console.log(`  Job title: ${employee.title}`);
      console.log(`  Department: ${employee.department}`);
      console.log(`  Salary: ${employee.salary}`);
      console.log(`  Manager Name: ${employee.managerFirstName} ${employee.managerLastName}`);
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
      db.query('INSERT INTO departments (name) VALUES (?)', [departmentName], (err, result) => {
        if (err) {
          console.error('An error occurred while adding a department:', err);
          return;
        }

        console.log(`Successfully added department: ${departmentName} (ID: ${result.insertId})`);
      });
    });
}

function addRole() {
  Department.findAll()
    .then((departments) => {
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
            type: 'list',
            message: 'Select the department for the role:',
            choices: departments.map((department) => ({
              name: department.name,
              value: department.id,
            })),
          },
        ])
        .then((answers) => {
          const { title, salary, departmentId } = answers;
          db.query(
            'INSERT INTO roles (title, salary, departmentId) VALUES (?, ?, ?)',
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
    })
    .catch((err) => {
      console.error('An error occurred while fetching departments:', err);
    });
}

function addEmployee() {
  Role.findAll()
    .then((roles) => {
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
            type: 'list',
            message: "Select the employee's role:",
            choices: roles.map((role) => ({
              name: role.title,
              value: role.id,
            })),
          },
          {
            name: 'managerId',
            type: 'input',
            message: "Enter the employee's manager ID:",
            validate: function (value) {
              const valid = !isNaN(parseInt(value)) && parseInt(value) >= 0;
              return valid || 'Please enter a positive number';
            },
          },
        ])
        .then((answers) => {
          const { firstName, lastName, roleId, managerId } = answers;
          db.query(
            'INSERT INTO employees (firstName, lastName, roleId, managerId) VALUES (?, ?, ?, ?)',
            [firstName, lastName, roleId, managerId],
            (err, result) => {
              if (err){
                console.error('An error occurred while adding an employee:', err);
                return;
              }

              console.log(
                `Successfully added employee: ${firstName} ${lastName} (ID: ${result.insertId})`
              );
            }
          );
        });
    })
    .catch((err) => {
      console.error('An error occurred while fetching roles:', err);
    });
}

function updateEmployeeRole() {
  Employee.findAll()
    .then((employees) => {
      const employeeChoices = employees.map((employee) => ({
        name: `${employee.firstName} ${employee.lastName}`,
        value: employee.id,
      }));

      inquirer
        .prompt({
          name: 'employeeId',
          type: 'list',
          message: 'Select the employee to update:',
          choices: employeeChoices,
        })
        .then((answers) => {
          const { employeeId } = answers;
          Employee.findByPk(employeeId)
            .then((selectedEmployee) => {
              Role.findAll()
                .then((roles) => {
                  const roleChoices = roles.map((role) => ({
                    name: role.title,
                    value: role.id,
                  }));

                  inquirer
                    .prompt({
                      name: 'roleId',
                      type: 'list',
                      message: 'Select the new role for the employee:',
                      choices: roleChoices,
                    })
                    .then((answers) => {
                      const { roleId } = answers;
                      selectedEmployee
                        .update({ roleId })
                        .then(() => {
                          console.log(`Successfully updated employee's role.`);
                        })
                        .catch((err) => {
                          console.error('An error occurred while updating an employee role:', err);
                        });
                    });
                })
                .catch((err) => {
                  console.error('An error occurred while fetching roles:', err);
                });
            })
            .catch((err) => {
              console.error('An error occurred while fetching the selected employee:', err);
            });
        });
    })
    .catch((err) => {
      console.error('An error occurred while fetching employees:', err);
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


