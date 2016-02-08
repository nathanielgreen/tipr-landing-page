angular.module('tipr.services', [])

.service('UserDataService', function ($http) {

  var self = this;

  self.getData = function() {
    return $http.get('../mocks/userData.json')
    .then(function(response) {
      return response;
    })
  }
});
