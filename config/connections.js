const mysql = require('mysql2');

require('dotenv').config();

const db = mysql.createConnection(
    process.env.DB_DATABASE
    ,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      user: 'root',
      password: 'Latrell2003!',
      database: 'employeeTracker'
    },
    console.log(`Connected to the employeeTracker database.`)
  );


module.exports = db;