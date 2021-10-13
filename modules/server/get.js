const express = require('express');
const router = express.Router();
const db = require('../helper/database');
const jwt = require('../helper/jwt');

router.get('/', ((request, response) => {
    if (jwt.validate(request.headers)) {
        let user = jwt.getTokenData(request.headers);

        db.select('*', 'servers', 'id IN (SELECT server_id FROM server_group WHERE group_id IN (SELECT group_id FROM user_group WHERE user_id = ?))', user.id).then(servers => {
            servers.results.map(s => s.image ? s.image = new Buffer.from( s.image, 'binary' ).toString() : s.image = null);
            response.status(200).send(servers)
        });
    } else {
        response.status(403).send('Not authorized');
    }
}));

module.exports = router;
