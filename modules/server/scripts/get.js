const express = require('express');
const router = express.Router();
const db = require('../../helper/database');
const jwt = require('../../helper/jwt');

router.get('/:id', ((request, response) => {
    if (jwt.validate(request.headers)) {

        db.select('id, server_id, name, type', 'server_scripts', 'server_id = ?', request.params.id).then(servers => {
            response.status(200).send(servers)
        });
    } else {
        response.status(403).send('Not authorized');
    }
}));

module.exports = router;
