const express = require('express');
const router = express.Router();
const db = require('../helper/database');
const jwt = require('../helper/jwt');

router.get('/', ((request, response) => {
    if (jwt.validate(request.headers)) {
        let user = jwt.getTokenData(request.headers);

        db.select('*', 'groups', 'id IN (SELECT group_id FROM user_group WHERE user_id = ?)', user.id).then(groups => {
            let groupIds = db.getIds(groups);

            if (groupIds.length > 0) {
                db.select('*', 'users', 'id IN (SELECT user_id FROM user_group WHERE group_id IN (?))', groupIds).then(users => {
                    users.results.map(u => u.image ? u.image = new Buffer.from( u.image, 'binary' ).toString() : u.image = null);
                    db.select('*', 'user_group', 'group_id IN (?)', groupIds).then(user_groups => {
                        db.selectInnerJoin('id, name, information, type, sg.group_id', 'servers', 'server_group sg on servers.id = sg.server_id WHERE group_id IN (?)', groupIds).then(servers => {
                            groups.results.forEach(group => {
                                group.users = [];
                                group.servers = [];

                                user_groups.results.filter(x => x.group_id === group.id).forEach(user_group => {
                                    group.users.push(users.results.find(u => u.id === user_group.user_id))
                                });

                                group.servers.push(servers.results.filter(x => x.group_id === group.id));
                            })

                            response.status(200).send(groups);
                        })
                    });
                });
            }
        });
    } else {
        response.status(403).send('Not authorized');
    }
}));

module.exports = router;
