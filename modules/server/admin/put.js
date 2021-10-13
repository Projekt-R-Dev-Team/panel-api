const express = require('express');
const router = express.Router();
const db = require('../../helper/database');
const jwt = require('../../helper/jwt');

router.put('/:id', ((request, response) => {
    if (jwt.validate(request.headers)) {
        if (jwt.getTokenData(request.headers).isAdmin === 1) {
            db.update('servers', 'name = ?, information = ?, image = BINARY(?), type = ?', 'id = ?',
                [request.body.name, request.body.information, request.body.image, request.body.type, request.body.id]).then(() => {
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
