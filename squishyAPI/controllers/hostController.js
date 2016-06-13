'use strict';

(function () {

    var hostController = function (Host) {

        var findHostById = function (req, res, next) {
            Host.findById(req.params.hostId, function (err, hoster) {
                if (err) {
                    res.status(500).send(err);
                } else if (hoster) {
                    console.log(req.hoster);
                    req.hoster = hoster;
                    next();
                } else {
                    res.status(404).send('Profile not found.');
                }
            });
        };

        // note: can't use host as that is a designated keyword
        // req.hoster is now populated
        var get = function (req, res) {
            res.json(req.hoster);
        };

        var put = function (req, res) {
            // TODO
        };

        var patch = function () {
            // TODO
        };

        var deleteHost = function () {
            // TODO
        };

        return {
            findHost: findHostById,
            get: get,
            put: put,
            patch: patch,
            delete: deleteHost
        };
    };

    module.exports = hostController;
}());