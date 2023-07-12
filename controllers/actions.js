const Department = require('../db/models/department');
const Role = require('../db/models/role');
const Employee = require('../db/models/employee');


async function viewAllDepartments() {
    try {
        // Fetch all departments from the database
        const departments = await Department.findAll();

        // Display the department information
        console.log('All Departments:');
        departments.forEach((department) => {
            console.log(`- Department Name: ${department.name}`);
            console.log(`  Department ID: ${department.id}`);
            console.log('---------------------');
        });
    } catch (error) {
        console.error('An error occurred while viewing all departments:', error);
    }
}



// Function to view all roles
async function viewAllRoles() {
    try {
        // Fetch all roles from the database
        const roles = await Role.findAll();

        // Display the role information
        console.log('All Roles:');
        roles.forEach((role) => {
            console.log(`- Title: ${role.title}`);
            console.log(`  Role ID: ${role.id}`);
            console.log(`  Department: ${role.department.name}`);
            console.log(`  Salary: ${role.salary}`);
            console.log('---------------------');
        });
    } catch (error) {
        console.error('An error occurred while viewing all roles:', error);
    }
}

// Function to view all employees
async function viewAllEmployees() {
    try {
        // Fetch all employees from the database
        const employees = await Employee.findAll({
            include: {
                model: Role,
                include: {
                    model: Employee,
                    as: 'manager',
                },
            },
        });

        // Display the employee information
        console.log('All Employees:');
        employees.forEach((employee) => {
            console.log(`  Name: ${employee.firstName} ${employee.lastName}`);
            console.log(`  Employee ID: ${employee.id}`);
            console.log(`  Job title: ${employee.role.title}`);
            console.log(`  Department: ${employee.role.department.name}`);
            console.log(`  Salary: ${employee.role.salary}`);
            console.log(`  Manager Name: ${employee.manager.firstName} ${employee.manager.lastName}`);
            console.log('---------------------');
        });
    } catch (error) {
        console.error('An error occurred while viewing all employees:', error);
    }
}


// Function to add a department
async function addDepartment() {
    try {
        const { departmentName } = await inquirer.prompt({
            name: 'departmentName',
            type: 'input',
            message: 'Enter the name of the department:',
        });

        // Create the new department in the database
        const newDepartment = await Department.create({ name: departmentName });

        console.log(`Successfully added department: ${newDepartment.name} (ID: ${newDepartment.id})`);
    } catch (error) {
        console.error('An error occurred while adding a department:', error);
    }
}


// Function to add a role
async function addRole() {
    try {
        // Fetch all departments to display as choices
        const departments = await Department.findAll();

        const roleDetails = await inquirer.prompt([
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
                    // Validate that the input is a positive number
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
        ]);

        // Create the new role in the database
        const newRole = await Role.create({
            title: roleDetails.title,
            salary: parseFloat(roleDetails.salary),
            departmentId: roleDetails.departmentId,
        });

        console.log(`Successfully added role: ${newRole.title} (ID: ${newRole.id})`);
    } catch (error) {
        console.error('An error occurred while adding a role:', error);
    }
}

// Function to add an employee
async function addEmployee() {
    try {
        // Fetch all roles to display as choices
        const roles = await Role.findAll();

        const employeeDetails = await inquirer.prompt([
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
                    // Validate that the input is a positive number
                    const valid = !isNaN(parseInt(value)) && parseInt(value) >= 0;
                    return valid || 'Please enter a positive number';
                },
            },
        ]);

        // Create the new employee in the database
        const newEmployee = await Employee.create({
            firstName: employeeDetails.firstName,
            lastName: employeeDetails.lastName,
            roleId: employeeDetails.roleId,
            managerId: parseInt(employeeDetails.managerId),
        });

        console.log(`Successfully added employee: ${newEmployee.firstName} ${newEmployee.lastName} (ID: ${newEmployee.id})`);
    } catch (error) {
        console.error('An error occurred while adding an employee:', error);
    }
}

// Function to update an employee role
async function updateEmployeeRole() {
    try {
        // Fetch all employees to display as choices
        const employees = await Employee.findAll();

        const employeeChoices = employees.map((employee) => ({
            name: `${employee.firstName} ${employee.lastName}`,
            value: employee.id,
        }));

        const { employeeId } = await inquirer.prompt({
            name: 'employeeId',
            type: 'list',
            message: 'Select the employee to update:',
            choices: employeeChoices,
        });

        // Fetch the selected employee's details
        const selectedEmployee = await Employee.findByPk(employeeId);

        // Fetch all roles to display as choices
        const roles = await Role.findAll();

        const roleChoices = roles.map((role) => ({
            name: role.title,
            value: role.id,
        }));

        const { roleId } = await inquirer.prompt({
            name: 'roleId',
            type: 'list',
            message: 'Select the new role for the employee:',
            choices: roleChoices,
        });

        // Update the employee's role in the database
        await selectedEmployee.update({ roleId });

        console.log(`Successfully updated employee's role.`);
    } catch (error) {
        console.error('An error occurred while updating an employee role:', error);
    }
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
