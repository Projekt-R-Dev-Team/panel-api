const express = require('express');
const router = express.Router();
const db = require('../helper/database');
const jwt = require('../helper/jwt');

router.post('/login', ((request, response) => {
    if (request.body.username && request.body.password) {
        db.select("*", "users", "username = ? AND password = ?", [request.body.username, request.body.password]).then(result => {
            if (result.length === 1) {
                response.status(200).send(jwt.generateToken(result.rows[0].username, result.rows[0].password));
            } else {
                response.status(403).send('Wrong username or Password');
            }
        })
    } else {
        response.status(404).send('Parameter not found');
    }
}));

module.exports = router;
