'use strict';

(function () {

    var apn = require('apn');
    var _ = require('lodash');

    var partyNewsController = function (PartyNews, Hosts) {

        var getAllPartyNews = function (req, res) {
            PartyNews.find().sort({createdAt: -1}).lean().exec(function (err, partyNews) {
                if (err) {
                    return res.json({error: err});
                }

                res.json({error: null, partyNews: partyNews});
            });
        };

        var getOnePartyNews = function (req, res) {
            var id = req.params.id;

            PartyNews.findById(id).lean().exec(function (err, partyNews) {
                if (err) {
                    return res.json({error: err});
                }

                res.json({error: null, partyNews: partyNews});
            });
        };

        var postPartyNews = function (req, res) {
            var username = req.body.username;
            var text = req.body.text;

            var partyNews = new PartyNews({
                username: username,
                text: text
            });

            partyNews.save(function (err, partyNews) {
                process.nextTick(function () {
                    sendPush(partyNews);
                });
                res.redirect('/partynews');
            });
        };

        function sendPush (partyNews) {
            var text = partyNews.text.substr(0, 100);

            Hosts.find({deviceRegistered: true}).lean().exec(function (err, hosts) {
                if (!err) {
                    for (var i = 0; i < hosts.length; i++) {
                        var host = hosts[i];

                        var device = new apn.Device(user.deviceToken);
                        var note = new apn.Notification();

                        note.badge = 1;
                        note.contentAvailable = 1;
                        note.alert = {
                            body: text
                        };
                        note.device = device;

                        var options = {
                            gateway: 'gateway.sandbox.push.apple.com',
                            errorCallback: function (error) {
                                console.log('push error', error);
                            },
                            cert: 'PartySquasherCert.pem',
                            key: 'PartySquasherKey.pem',
                            passphrase: 'bluefox15',
                            port: 2195,
                            enhanced: true,
                            cacheLength: 100
                        };

                        var apnsConnection = new apn.Connection(options);
                        console.log('push sent to ', host.username);
                        apnsConnection.sendNotification(note);
                    }
                }
            });
        }

        return {
            getAllPartyNews: getAllPartyNews,
            getOnePartyNews: getOnePartyNews,
            postPartyNews: postPartyNews
        };

    };

    module.exports = partyNewsController;
}());