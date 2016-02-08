angular.module('tipr.controllers', [])

.controller('ProfileCtrl', function($scope) {

})

.controller('PayCtrl', function($scope) {

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
