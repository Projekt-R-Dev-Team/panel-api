module.exports = function (app) {
    app.use('/groups', require('./get')); // get Groups
    app.use('/admin/groups/', require('./admin/get')) // get Admin Groups
    app.use('/groups/', require('./admin/post')) // post Admin Groups
    app.use('/groups/', require('./admin/put')) // put Admin Groups
}
