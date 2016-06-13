'use strict';

(function () {

    var express = require('express');

    var routes = function (Host) {
        var hostRouter = express.Router();
        var hostsController = require('../controllers/hostsController')(Host);

        hostRouter.route('/')
            .post(hostsController.post)
            .get(hostsController.get);

        return hostRouter;
    };

    module.exports = routes;
}());