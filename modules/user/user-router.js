module.exports = function (app) {
    app.use('/user', require('./login')); // User Login
}
