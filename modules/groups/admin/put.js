const express = require('express');
const router = express.Router();
const db = require('../../helper/database');
const jwt = require('../../helper/jwt');

router.put('/:id', ((request, response) => {
    if (jwt.validate(request.headers)) {
        if (jwt.getTokenData(request.headers).isAdmin === 1) {
            db.update('groups', 'name = ?', 'id = ?', [request.body.name, request.body.id]).then(() => {
                db.deleteRow('user_group', 'group_id = ?', request.body.id).then(() => {
                    request.body.users.forEach(user => {
                        db.insert('user_group', 'user_id, group_id', '?,?', [user.id, request.body.id]).then();
                    });
                    db.deleteRow('server_group', 'group_id = ?', request.body.id).then(() => {
                        request.body.servers[0].forEach(server => {
                            db.insert('server_group', 'server_id, group_id', '?,?', [server.id, request.body.id]).then();
                        })
                    })
                    response.status(200).send();
                })
            });
        } else {
            response.status(403).send('Not authorized');
        }
    } else {
        response.status(403).send('Not authorized');
    }
}));

module.exports = router;
