angular.module('starter', [])

.factory('StorageService', ['$localStorage', function($localStorage){

  $localStorage = $localStorage.$default({
    hosts: []
  });

  var _getAll = function () {
    return $localStorage.hosts;
  };

  var _add = function (host) {
    $localStorage.hosts.push(host);
  };

  var _remove = function (host) {
    $localStorage.hosts.splice($localStorage.hosts.indexOf(host), 1);
  };

  return {
    getAll: _getAll,
    add: _add,
    remove: _remove
  };
}]);