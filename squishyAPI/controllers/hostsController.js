'use strict';

(function () {

    var hostsController = function (Host) {

        var socialLogIn = function (req, res) {
            var socialId = req.body.user_id;
            var username = req.body.screen_name;

            Host.findOne({socialId: socialId}).lean().exec(function (err, user) {
                if (err) {
                    return res.json({error: err});
                }

                if (user) {
                    return res.json({error: null, user: user});
                }

                var newUser = new Host({
                    socialId: socialId,
                    username: username
                });

                newUser.save(function (err, user) {
                    if (err) {
                        return res.json({error: err});
                    }

                    res.json({user: user, error: null});
                });
            });
        };

        var registerDevice = function (req, res) {
            var user = req.body.user;
            var token = req.body.token;

            Host.findyByIdAndUpdate(user._id, {
                $set: {
                    deviceToken: token,
                    deviceRegistered: true
                }
            }).lean().exec(function (err, user) {
                if (err || !user) {
                    return res.json({error: err});
                }

                res.json({error: null, user: user});
            });
        }

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
            socialLogIn: socialLogIn,
            registerDevice: registerDevice,
            post: post,
            get: get
        };
    };

    module.exports = hostsController;
}());