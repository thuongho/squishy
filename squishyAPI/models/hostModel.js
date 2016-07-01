'use strict';

(function () {

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var hostModel = new Schema({
        socialId: {type: String, index: true, unique: true},
        username: {type: String, unique: true},
        firstName: {type: String},
        lastName: {type: String},
        email: {type: String},
        deviceToken: {type: String, unique: true},
        deviceRegistered: {type: Boolean, default: false},
        createdAt: {type: Date, default: Date.now}
    });

    module.exports = mongoose.model('Host', hostModel);
}());