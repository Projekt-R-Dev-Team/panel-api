const express = require('express');
const router = express.Router();
const db = require('../../helper/database');
const jwt = require('../../helper/jwt');

router.post('/', ((request, response) => {
    if (jwt.validate(request.headers)) {
        if (jwt.getTokenData(request.headers).isAdmin === 1) {
            db.insert('groups', 'name', ',?', [request.body.name]).then(() => {
                db.select('id', 'groups', 'name = ', [request.body.name]).then(group => {
                    request.body.users.forEach(user => {
                        db.insert('user_group', 'user_id, group_id', '?,?', [user.id, group.id]).then();
                    });
                    request.body.servers[0].forEach(server => {
                        db.insert('server_group', 'server_id, group_id', '?,?', [server.id, group.id]).then();
                    })
                    response.status(200).send('Success');
                });
            });
        } else {
            response.status(403).send('Not authorized');
        }
    } else {
        response.status(403).send('Not authorized');
    }
}));

module.exports = router;
