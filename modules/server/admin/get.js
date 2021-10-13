const express = require('express');
const router = express.Router();
const db = require('../../helper/database');
const jwt = require('../../helper/jwt');

router.get('/', ((request, response) => {
    if (jwt.validate(request.headers)) {
        if (jwt.getTokenData(request.headers).isAdmin === 1) {
            db.select('*', 'servers').then(servers => {
                servers.results.map(s => {
                    return s.image ? s.image = new Buffer.from( s.image, 'binary' ).toString() : s.image = null
                });
                response.status(200).send(servers)
            });
        } else {
            response.status(403).send('Not authorized');
        }
    } else {
        response.status(403).send('Not authorized');
    }
}));

module.exports = router;
