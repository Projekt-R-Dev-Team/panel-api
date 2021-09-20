const mysql = require('mysql');
const logger = require('./logger');

const connection = mysql.createConnection({
    host: process.env.DATABASE_SERVER,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE
});

connection.connect((err) => {
    if (err) logger.error(err);
    logger.message("Connection established", "DATABASE")
});
