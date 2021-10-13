const express = require('express');
const router = express.Router();
const db = require('../helper/database');
const jwt = require('../helper/jwt');

router.put('/:id', ((request, response) => {
    if (request.body) {
        if (jwt.validate(request.headers)) {
            if (jwt.getTokenData(request.headers).isAdmin === 1) {
                db.update('users', 'username = ?, image = BINARY(?), isAdmin = ?', 'id = ?',
                    [request.body.username, request.body.image, request.body.isAdmin, request.body.id]).then(() => {
                    response.status(200).send();
                })
            } else {
                let user = jwt.getTokenData(request.headers);
                db.update('users', 'image = BINARY(?)', 'id = ?', [request.body.image, user.id]).then(() => {
                    response.status(200).send();
                })
            }

        } else {
            response.status(403).send('Not authorized');
        }
    } else {
        response.status(404).send('Parameter not found');
    }
}));

module.exports = router;
