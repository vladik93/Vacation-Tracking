var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vacation_data'
});

connection.connect(function(err) {
    if(err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as ID: ' + connection.threadId);
});


connection.query("CREATE DATABASE IF NOT EXISTS vacation_data", function(err, result) {
    if(err) throw err;
    console.log('Database found');
});

// ==================================== DATA TABLES =========================================================================== // 

// USERS TABLE

var userTableQuery = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, last_name VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, username VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, password VARCHAR(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, admin BIT(1) DEFAULT 0)";

connection.query(userTableQuery, function(err, result) {
    if(err) throw err;
    console.log('users table found');
});

// VACATIONS TABLE

var vacationTableQuery = "CREATE TABLE IF NOT EXISTS vacations (id INT AUTO_INCREMENT PRIMARY KEY, description VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'No description found', destination VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, image VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'http://localhost/vladi_project_images/no_image.jpg', start_date DATE NOT NULL, end_date DATE NOT NULL, price INT(50) NOT NULL, follow_count INT(50) DEFAULT 0)";

connection.query(vacationTableQuery, function(err, result) {
    if(err) throw err;
    console.log('vacations table found');
});

var vbuTableQuery = "CREATE TABLE IF NOT EXISTS vacations_by_users (_index INT AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL, vacation_id INT NOT NULL)";

connection.query(vbuTableQuery, function(err, result) {
    if(err) throw err;
    console.log('vacations_by_users table found');
});

// var vbuTableUpdate = "ALTER TABLE vacations_by_users ADD UNIQUE KEY user_id (user_id, vacation_id)";

// connection.query(vbuTableUpdate, function(err, result) {
//     if(err) throw err;
//     console.log('vacations_by_users table updated');
// })

// ============================================================================================================================ //

module.exports = connection;
