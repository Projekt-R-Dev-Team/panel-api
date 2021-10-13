const express = require('express');
const router = express.Router();
const db = require('../helper/database');
const jwt = require('../helper/jwt');

router.get('/', ((request, response) => {
    if (jwt.validate(request.headers)) {
        let user = jwt.getTokenData(request.headers);
        db.select('image', 'users', 'id = ?', user.id).then(resp => {
            resp.results[0].image = new Buffer.from( resp.results[0].image,'binary' ).toString();
            response.status(200).send(resp);
        });
    } else {
        response.status(403).send('Not authorized');
    }
}));

module.exports = router;
