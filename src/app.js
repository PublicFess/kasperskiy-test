(function() {

  var app = angular.module('kaspersky-test',
    ['ui.router']);

  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function(
      $stateProvider,
      $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');
      require('./states')($stateProvider);
    }]);
}());
