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
                    "results" : result,
                    "length" : result.length
                }
            }

            resolve(result);
        });
    })
}

async function insert(TABLE, FIELDS, VALUES, data) {

    if (!data) data = {};

    if (!FIELDS || !TABLE) {
        logger.warning("'FIELDS' or 'TABLE' are empty", "Database");
    }

    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${TABLE} (${FIELDS}) VALUES(${VALUES})`, data, (error, result) => {
            if (error) {
                logger.error(error, "DATABASE")
                reject(error);
            }

            if (result) {
                result = {
                    "results" : result
                }
            }

            resolve(result);
        });
    })
}

async function update(TABLE, FIELDS, WHERE, data) {
    if (!FIELDS || !TABLE) {
        logger.warning("'FIELDS' or 'TABLE' are empty", "Database");
    }

    let where;

    if (WHERE) {
        where = `WHERE ${WHERE}`;
    } else {
        where = '';
    }
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${TABLE} SET ${FIELDS} ${where}`, data, (error, result) => {
            if (error) {
                logger.error(error, "DATABASE")
                reject(error);
            }

            if (result) {
                result = {
                    "results" : result
                }
            }

            resolve(result);
        });
    })
}

async function selectInnerJoin(FIELDS, TABLE, INNERJoin, data) {
    let innerjoin;

    if (INNERJoin) {
        innerjoin = `INNER JOIN ${INNERJoin}`;
    } else {
        innerjoin = '';
    }

    if (!FIELDS || !TABLE) {
        logger.warning("'FIELDS' or 'TABLE' are empty", "Database");
    }

    return new Promise((resolve, reject) => {
        connection.query(`SELECT ${FIELDS} FROM ${TABLE} ${innerjoin}`, data, (error, result) => {
            if (error) {
                logger.error(error, "DATABASE")
                reject(error);
            }

            if (result) {
                result = {
                    "results" : result,
                    "length" : result.length
                }
            }

            resolve(result);
        });
    })
}

async function deleteRow(TABLE, WHERE, data) {
    if (!TABLE) {
        logger.warning("'FIELDS' or 'TABLE' are empty", "Database");
    }

    let where;

    if (WHERE) {
        where = `WHERE ${WHERE}`;
    } else {
        where = '';
    }
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${TABLE} ${where}`, data, (error, result) => {
            if (error) {
                logger.error(error, "DATABASE")
                reject(error);
            }

            if (result) {
                result = {
                    "results" : result
                }
            }

            resolve(result);
        });
    })
}

function getIds(resp) {
    return resp.results.map(item => item.id);
}

module.exports = {
    select,
    insert,
    update,
    deleteRow,
    selectInnerJoin,
    getIds
}
