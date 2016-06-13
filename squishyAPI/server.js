'use strict';

(function () {

    var express = require('express'),
        mongoose = require('mongoose'),
        bodyParser = require('body-parser');

    var db = mongoose.connect('mongodb://localhost/squishyAPI');

    var Host = require('./models/hostModel');
    var app = express();

    var port = process.env.PORT || 3000;

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    var hostRouter = require('./routes/hostRoutes.js')(Host);

    app.use('/api/hosts', hostRouter);

    app.get('/', function (req, res) {
        res.send('Welcome to Squishy API.');
    });

    app.listen(port, function () {
        console.log('Running on port: ' + port);
    });

    module.exports = app;

}());