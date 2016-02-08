angular.module('tipr.controllers', [])

.controller('HistoryController', function($scope) {

})

.controller('DashController', function(UserDataService) {

  var self = this;

  var userData = {};

  getUserData = function () {
    UserDataService.getData()
    .then(function(response){
      self.userData = response.data;
    });
  };

  getUserData();
})

.controller('AccountController', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


.controller('SignInController', SignInController);

function SignInController(AuthService, $state) {

  this.signIn = function (user) {
    AuthService.logIn(user).then(function () {
      $state.go('tab.dash');
    }).catch(function (error) {
      alert(error);
    });
  };

}
