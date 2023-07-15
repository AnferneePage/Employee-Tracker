# Employee-Tracker# 

Employee Tracker is a command-line application that allows you to manage employees, departments, and roles within your organization. With this application, you can easily view and manipulate employee data in a user-friendly manner.

https://drive.google.com/file/d/1ZTMaRPXP2b33VLMYcKYPVSuktnuhMxWS/view

## Installation

To use the Employee Tracker application, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies by running the command `npm install`.
3. Set up the database by importing the provided `schema.sql` file in your preferred MySQL client.
4. (Optional) If you want to populate the database with sample data, you can run the `seeds.sql` file in your MySQL client.
5. Create a `.env` file and configure the database connection settings based on your MySQL setup. Here's an example configuration:
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_DATABASE=employeeTracker
6. Start the application by running the command `npm start` or `node index.js`.

## Usage

Upon starting the Employee Tracker application, you will be presented with a menu of options:

- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee role
- Exit

Simply select the desired option by using the arrow keys and pressing Enter.

### View all departments

Selecting "View all departments" will display a formatted table showing the names and IDs of all departments in the database.

### View all roles

Selecting "View all roles" will display a formatted table showing the job titles, role IDs, departments, and salaries for all roles in the database.

### View all employees

Selecting "View all employees" will display a formatted table showing the employee IDs, first names, last names, job titles, departments, salaries, and managers for all employees in the database.

### Add a department

Selecting "Add a department" will prompt you to enter the name of the department you wish to add. Once entered, the department will be added to the database.

### Add a role

Selecting "Add a role" will prompt you to enter the title, salary, and department for the role you wish to add. Once entered, the role will be added to the database.

### Add an employee

Selecting "Add an employee" will prompt you to enter the first name, last name, role, and manager for the employee you wish to add. Once entered, the employee will be added to the database.

### Update an employee role

Selecting "Update an employee role" will prompt you to select an employee from a list and enter the new role for the selected employee. Once entered, the employee's role will be updated in the database.

## Contributing

Contributions to Employee Tracker are welcome! If you find any issues or have suggestions for improvements, please submit an issue or a pull request on the GitHub repository.

## License

The Employee Tracker application is open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Contact

For any inquiries or support, please contact pagelatrell14@gmail.com.

---
