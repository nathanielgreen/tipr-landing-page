angular.module('tipr.controllers', [])

.controller('HistoryController', function($scope) {

})

.controller('DashController', function($firebaseAuth, $firebaseObject) {

  var self = this;

  var ref = new Firebase('https://tipr.firebaseio.com/');
  var usersRef = ref.child('users');

  $firebaseAuth(ref).$onAuth(function(auth) {
    self.user = auth ? $firebaseObject(usersRef.child(auth.uid)) : null;
  });

})

.controller('AccountController', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('SignInController', function($state, AuthService){
  this.signIn = function(user) {
    AuthService.logIn(user).then(function () {
      $state.go('tab.dash');
    }).catch(function (error) {
      alert(error);
    });
  };
})

.controller('SignUpController', function($state, AuthService) {
  this.signUp = function(user) {
    AuthService.signUp(user).then(function () {
      return AuthService.logIn(user);
    }).then(function () {
      $state.go('tab.dash');
    }).catch(function (error) {
      alert(error);
    });
  };

  this.invalid = function(password, passwordConfirmation) {
    return password != passwordConfirmation
  }
});
