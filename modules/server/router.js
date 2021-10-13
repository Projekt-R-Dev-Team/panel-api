module.exports = function (app) {
    app.use('/servers', require('./get')); // get Server
    app.use('/server/scripts', require('./scripts/get')); // get Server Scripts by server id
    app.use('/server/admin/', require('./admin/get')); // get all server as admin
    app.use('/servers', require('./admin/put')); // put Server
    app.use('/server/scripts', require('./scripts/admin/put')); // put Scripts
    app.use('/server/scripts', require('./scripts/admin/post')); // post Scripts
}
