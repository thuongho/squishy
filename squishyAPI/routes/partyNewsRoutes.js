'use strict';

(function () {

  var express = require('express');

  var routes = function (PartyNews, Hosts) {
    var partyNewsRouter = express.Router();
    var partyNewsController = require('../controllers/partyNewsController')(PartyNews, Hosts);

    partyNewsRouter.route('/partynews')
      .get(partyNewsController.getAllPartyNews)
      .post(partyNewsController.postPartyNews);

    partyNewsRouter.route('/partynews/:newsId')
      .get(partyNewsController.getOnePartyNews);

      return partyNewsRouter;
  };

  module.exports = routes;
}());