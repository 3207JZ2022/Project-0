
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'project0',
    password: 'qwert520'
  });
  module.exports = connection
