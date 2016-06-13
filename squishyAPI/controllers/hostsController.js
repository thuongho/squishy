'use strict';

(function () {

    var hostsController = function (Host) {

        var post = function (req, res) {
            var host = new Host(req.body);

            host.save();
            console.log('POST host', host);
            res.send(host);
        };

        var get = function (req, res) {
            var query = {};

            query = req.query;

            Host.find(query, function (err, hosts) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(hosts);
                }
            });
        };

        return {
            post: post,
            get: get
        };
    };

    module.exports = hostsController;
}());