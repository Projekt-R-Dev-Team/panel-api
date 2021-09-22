const express = require('express');
const router = express.Router();
const db = require('../helper/database');
const jwt = require('../helper/jwt');
const log = require('../helper/logger');

router.post('/login', ((request, response) => {
    if (request.body.username && request.body.password) {
        db.select("*", "users", "username = ? AND password = ?", [request.body.username, request.body.password]).then(result => {
            if (result.length === 1) {
                log.info(`User '${request.body.username}' Logged in.`, "LOGIN")
                response.status(200).send({ token: jwt.generateToken(result.rows[0].username, result.rows[0].password)});
            } else {
                log.info(`User '${request.body.username}', wrong username or password`, "LOGIN")
                response.status(401).send('Wrong username or password');
            }
        })
    } else {
        response.status(404).send('Parameter not found');
    }
}));

module.exports = router;
