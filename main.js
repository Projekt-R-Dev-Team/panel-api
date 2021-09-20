const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const log = require('./modules/helper/logger');
let cors = require('cors');
require('dotenv').config();
app.use(bodyParser.json());
const db = require('./modules/helper/database');

app.use(cors())
app.options('*', cors())

require('./router.js')(app);

app.listen(3030, function () {
    log.message('Panel-Api is running!')
});
