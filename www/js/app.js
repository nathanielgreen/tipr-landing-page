
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

    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.history', {
    url: '/history',
    views: {
      'tab-history': {
        templateUrl: 'templates/tab-history.html',
        controller: 'HistoryController as historyCtrl'
      }
    }
  })

  .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashController as dashCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountController as accountCtrl'
      }
    }
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
