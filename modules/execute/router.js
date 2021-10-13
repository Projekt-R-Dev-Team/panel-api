module.exports = function (app) {
    app.use('/execute/script', require('./execute'));
}
