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

.controller('AccountController', function($firebaseAuth, $firebaseObject, $state) {

  var self = this;

  var ref = new Firebase('https://tipr.firebaseio.com/');
  var usersRef = ref.child('users');

  $firebaseAuth(ref).$onAuth(function(auth) {
    self.user = auth ? $firebaseObject(usersRef.child(auth.uid)) : null;
  });

  this.updateBalance = function(amount) {
    var userRef = new Firebase('https://tipr.firebaseio.com/users/'+self.user.$id);
    userRef.child('balance').set(self.user.balance + amount);
    $state.go('tab.dash')
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
    }

  this.invalid = function(password, passwordConfirmation) {
    return password != passwordConfirmation
  };
})

.controller('TipController', function($firebaseAuth, $firebaseObject, $state) {

  var self = this;

  var ref = new Firebase('https://tipr.firebaseio.com/');
  var usersRef = ref.child('users');
  self.usersHash = $firebaseObject(ref.child('users'));

  $firebaseAuth(ref).$onAuth(function(auth) {
    self.user = auth ? $firebaseObject(usersRef.child(auth.uid)) : null;
  });

  self.selectRecipient = function(uid) {
    self.recipientId = uid;
  }

  self.todaysDate = function() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {dd='0'+dd}
    if(mm<10) {mm='0'+mm}

    today = mm+'/'+dd+'/'+yyyy;
    return today
  }

  self.sendTip = function(amount) {
    var userRef = new Firebase('https://tipr.firebaseio.com/users/'+self.user.$id);
    userRef.child('balance').set(self.user.balance - amount);

    var recipient = self.usersHash[self.recipientId];
    var recipientRef = new Firebase("https://tipr.firebaseio.com/users/"+self.recipientId);
    recipientRef.child('balance').set(recipient.balance + amount);

    var date = new Date();
    var userTransaction = {"user": recipient.name, "amount": (amount * -1), 'date': self.todaysDate()}
    var recipientTransaction = {"user": self.user.name, "amount": amount, 'date': self.todaysDate()}
    userRef.child('history').push(userTransaction);
    recipientRef.child('history').push(recipientTransaction);
    $state.go('tab.dash')
  }
})
