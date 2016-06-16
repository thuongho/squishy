angular.module('starter.controllers')

.controller('LoginCtrl', ['$scope', function($scope){
  $scope.login = function(data) {
    // TODO Server Auth
    console.log(data);
  };

  $scope.fblogin = function() {

  };

}]);