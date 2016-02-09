angular.module('tipr.services', [])

.service('AuthService', function($firebaseAuth) {
  var self = this;

  var ref = new Firebase('https://tipr.firebaseio.com/');
  var auth = $firebaseAuth(ref);

  self.logOut = function() {
    if (auth) ref.child('users').child(auth.$getAuth().uid).off();
    return auth.$unauth();
  };

  self.logIn = function(user) {
    return auth.$authWithPassword(user);
  };

  self.signUp = function(user) {
    return auth.$createUser(user).then(function (userData) {
      ref.child('users').child(userData.uid).set({ email: user.email,
                                                   name: user.name,
                                                   balance: 0,
                                                 });
    });
  };
})
