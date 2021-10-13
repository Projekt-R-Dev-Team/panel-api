const express = require('express');
const router = express.Router();
const db = require('../../helper/database');
const jwt = require('../../helper/jwt');

router.get('/', ((request, response) => {
    if (jwt.validate(request.headers)) {
        if (jwt.getTokenData(request.headers).isAdmin === 1) {
            db.select('*', 'groups').then(news => {
                response.status(200).send(news)
            });
        } else {
            response.status(403).send('Not authorized');
        }
    } else {
        response.status(403).send('Not authorized');
    }
}));

module.exports = router;
