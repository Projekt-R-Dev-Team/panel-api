const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const log = require('./modules/helper/logger');
const cors = require('cors');
require('dotenv').config();


app.use(bodyParser.json());
app.use(cors())
app.options('*', cors())

require('./router.js')(app);

app.listen(process.env.API_PORT, function () {
    log.message('Panel-Api is running!')
});
