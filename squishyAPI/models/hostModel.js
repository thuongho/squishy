'use strict';

(function () {

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var hostModel = new Schema({
        facebooId: {type: String},
        firstName: {type: String},
        lastName: {type: String},
        email: {type: String}
    });

    module.exports = mongoose.model('Host', hostModel);
}());