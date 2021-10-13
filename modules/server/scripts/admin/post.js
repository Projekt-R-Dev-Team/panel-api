const express = require('express');
const router = express.Router();
const db = require('../../../helper/database');
const jwt = require('../../../helper/jwt');

router.post('/', ((request, response) => {
    if (jwt.validate(request.headers)) {
        if (jwt.getTokenData(request.headers).isAdmin === 1) {
            db.insert('server_scripts', 'server_id, name, type', '?,?,?', [request.body.server_id, request.body.name, request.body.type]).then(() => {
                response.status(200).send('Success');
            });
        } else {
            response.status(403).send('Not authorized');
        }
    } else {
        response.status(403).send('Not authorized');
    }
}));

module.exports = router;
