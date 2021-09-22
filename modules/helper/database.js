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

async function select(FIELDS, TABLE, WHERE, data) {
    let where;

    if (WHERE) {
       where = `WHERE ${WHERE}`;
    } else {
        where = '';
    }

    if (!FIELDS || !TABLE) {
        logger.warning("'FIELDS' or 'TABLE' are empty", "Database");
    }

    return new Promise((resolve, reject) => {
        connection.query(`SELECT ${FIELDS} FROM ${TABLE} ${where}`, data, (error, result) => {
            if (error) {
                logger.error(error, "DATABASE")
                reject(error);
            }

            if (result) {
                result = {
                    "rows" : result,
                    "length" : result.length
                }
            }

            resolve(result);
        });
    })
}

module.exports = {
    select
}
