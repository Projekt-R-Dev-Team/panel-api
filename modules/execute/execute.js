const express = require('express');
const router = express.Router();
const db = require('../helper/database');
const jwt = require('../helper/jwt');

router.get('/:id', ((request, response) => {
    if (jwt.validate(request.headers)) {
        let user = jwt.getTokenData(request.headers);

        db.selectInnerJoin('*', 'server_group', 'user_group ug on server_group.group_id = ug.group_id WHERE ug.user_id = ? AND server_id IN (SELECT server_id FROM server_scripts WHERE id = ?)', [user.id, request.params.id]).then(resp => {
            if (resp.length > 0) {
                console.log('Execute!');
            } else {
                response.status(404).send('Script not found');
            }
        });
    } else {
        response.status(403).send('Not authorized');
    }
}));

module.exports = router;
