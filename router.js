module.exports = function (app) {
    app.get('/', function (req, res) {
        res.send('[' + new Date().toLocaleTimeString() + '] Panel API is running!');
    });

    require('./modules/user/router')(app);
};
