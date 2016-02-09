angular.module('tipr.services', [])

.service('UserDataService', function ($http) {

  var self = this;

  self.getData = function() {
    return $http.get('../mocks/userData.json')
    .then(function(response) {
      return response;
    })
  }
})

.service('AuthService', AuthService);

function AuthService($firebaseAuth) {

  var self = this;

  var ref = new Firebase('https://tipr.firebaseio.com/');
  var auth = $firebaseAuth(ref);

  self.logOut = function () {
    if (auth) ref.child('users').child(auth.$getAuth().uid).off();
    return auth.$unauth();
  };

  self.logIn = function (user) {
    return auth.$authWithPassword(user);
  };

  self.signUp = function (user) {
    return auth.$createUser(user).then(function (userData) {
      ref.child('users').child(userData.uid).set({ email: user.email,
                                                   name: user.name,
                                                   balance: 0,
                                                 });
    });
  };
}
