const express = require('express');
const router = express.Router();
const db = require('../helper/database');
const jwt = require('../helper/jwt');

router.get('/', ((request, response) => {
    if (jwt.validate(request.headers)) {
        db.select('*', 'news').then(news => {
            response.status(200).send(news)
        });
    } else {
        response.status(403).send('Not authorized');
    }
}));

module.exports = router;
