const express = require('express');
const router = express.Router();
const db = require('../helper/database');
const jwt = require('../helper/jwt');

router.put('/:id', ((request, response) => {
    if (jwt.validate(request.headers)) {
        if (jwt.getTokenData(request.headers).isAdmin === 1) {
            db.update('news', 'title = ?, message = ?, active = ?', 'id = ?',
                [request.body.title, request.body.message, request.body.active, request.body.id]).then(resp => {
                    response.status(200).send();
                });
        } else {
            response.status(403).send('Not authorized');
        }
    } else {
        response.status(403).send('Not authorized');
    }
}));

module.exports = router;
