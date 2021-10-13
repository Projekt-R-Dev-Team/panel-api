module.exports = function (app) {
    app.use('/news', require('./get')); // get News
    app.use('/news', require('./post')); // post news
    app.use('/news', require('./put')); // put news
}
