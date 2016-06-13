'use strict';

(function () {

    var express = require('express');

    var routes = function (Host) {
        var hostRouter = express.Router();
        var hostsController = require('../controllers/hostsController')(Host);
        var hostController = require('../controllers/hostController')(Host);

        hostRouter.route('/')
            .post(hostsController.post)
            .get(hostsController.get);

        hostRouter.use('/:hostId', hostController.findHost);

        hostRouter.route('/:hostId')
            .get(hostController.get);

        return hostRouter;
    };

    module.exports = routes;
}());