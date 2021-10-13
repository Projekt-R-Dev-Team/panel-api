const express = require('express');
const router = express.Router();
const db = require('../helper/database');
const jwt = require('../helper/jwt');

router.get('/', ((request, response) => {
    if (jwt.validate(request.headers)) {
        if (jwt.getTokenData(request.headers).isAdmin === 1) {
            db.select('*', 'users').then(users => {
                users.results.map(u => u.image ? u.image = new Buffer.from( u.image, 'binary' ).toString() : u.image = null);
                response.status(200).send(users)
            });
        } else {
            response.status(403).send('Not authorized');
        }
    } else {
        response.status(403).send('Not authorized');
    }
}));

module.exports = router;
