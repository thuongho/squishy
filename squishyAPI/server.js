'use strict';

(function () {

    var express = require('express'),
        mongoose = require('mongoose'),
        bodyParser = require('body-parser');

    require('dotenv').config();

    var db;
    if (process.env.ENV === 'development') {
        db = mongoose.connect('mongodb://localhost/squishyAPI');
    } else {
        db = mongoose.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST);
    }

    var Host = require('./models/hostModel');
    var PartyNews = require('./models/partyNewsModel');
    var app = express();

    var port = process.env.PORT || 3000;

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header(
            'Access-Control-Allow-Headers',
            'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

        if ('OPTIONS' === req.method) {
            res.status(200).end();
        } else {
            next();
        }
    });

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    var hostRouter = require('./routes/hostRoutes.js')(Host);
    var partyNewsRouter = require('./routes/partyNewsRoutes.js')(PartyNews, Host);

    app.use('/api/hosts', hostRouter);

    app.use(express.static(__dirname + '/admin'));
    app.get('/partynews', function (req, res) {
        res.sendFile(__dirname + '/admin/add-party-news.html');
    });

    app.get('/', function (req, res) {
        res.send('Welcome to Squishy API.');
    });

    app.listen(port, function () {
        console.log('Running on port: ' + port);
    });

    module.exports = app;

}());