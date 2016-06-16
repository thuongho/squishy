angular.module('starter.controllers')

.controller('LoginCtrl', ['$scope', '$cordovaOauth', 'StorageService', function($scope, $cordovaOauth, StorageService){

  var CLIENT_ID = '';
  var EMAIL = '';

  // $ionicPlatform.ready(function() {
  //   $cordovaPlugin.someFunction().then(success, error);
  // });

  $scope.login = function(data) {
    // TODO Server Auth
    console.log(data);
  };

  $scope.fblogin = function() {
    $cordovaOauth.facebook(CLIENT_ID, [EMAIL])
      .then(function (result) {
        console.log(result);
      }, function (error) {
        console.log(error);
      });
  };

}]);