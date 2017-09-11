const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const init = (data) => {
    const app = express();

    // Config application
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    require('../config/auth.config')(app, data);

    // add routers
    require('./routers').attachTo(app, data);

    return Promise.resolve(app);
};

module.exports = { init };