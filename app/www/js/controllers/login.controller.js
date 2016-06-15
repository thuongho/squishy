angular.module('starter.controllers')

.controller('LoginCtrl', ['$scope', function($scope){
  $scope.login = function(data) {
    console.log(data);
  };
}]);