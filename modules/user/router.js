module.exports = function (app) {
    app.use('/user', require('./login')); // User Login
    app.use('/user', require('./update')); // User image update
    app.use('/avatar', require('./avatar')); // Get self avatar
    app.use('/user', require('./get')); // Get all users | Admin
}
