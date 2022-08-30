const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'employeesdb'
    },
    console.log(`Connected to the employeesdb database.`)
  );

  module.exports = db; 