angular.module('tipr.controllers', [])

.controller('HistoryController', function($scope) {

})

.controller('DashController', function(UserDataService) {

  var self = this;

  var userData = {};

  self.getUserData = function () {
    UserDataService.getData()
    .then(function(response){
      self.userData = response.data;
    });
  };
})

.controller('AccountController', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
