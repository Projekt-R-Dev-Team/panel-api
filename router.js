module.exports = function (app) {
    app.get('/', function (req, res) {
        res.send('[' + new Date().toLocaleTimeString() + '] Panel API is running!');
    });

    require('./modules/user/router')(app);
    require('./modules/server/router')(app);
    require('./modules/news/router')(app);
    require('./modules/groups/router')(app);
    require('./modules/execute/router')(app);
};
