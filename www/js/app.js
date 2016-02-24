
angular.module('tipr', ['ionic', 'firebase', 'tipr.controllers', 'tipr.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('history', {
    url: '/history',
    templateUrl: 'templates/history.html',
    controller: 'HistoryController as historyCtrl'
  })

  .state('dash', {
      url: '/dash',
      templateUrl: 'templates/dash.html',
      controller: 'DashController as dashCtrl'
    })

  .state('account', {
    url: '/account',
    templateUrl: 'templates/account.html',
    controller: 'AccountController as accountCtrl'
  })

  .state('signin', {
     url: '/sign-in',
     templateUrl: 'templates/sign-in.html',
     controller: 'SignInController as signInCtrl'
   })

   .state('signup', {
      url: '/sign-up',
      templateUrl: 'templates/sign-up.html',
      controller: 'SignUpController as signUpCtrl'
    })

    .state('tip', {
       url: '/tip',
       templateUrl: 'templates/tip.html',
       controller: 'TipController as tipCtrl'
     })

  $urlRouterProvider.otherwise('/sign-in');

});
