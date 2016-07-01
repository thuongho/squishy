'use strict';

(function () {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var partyNewsModel = new Schema({
        username: String,
        text: String,
        createdAt: {type: Date, default: Date.now}
    });

    module.exports = mongoose.model('PartyNews', partyNewsModel);
}());