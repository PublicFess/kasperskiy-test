var _ = require('lodash')

module.exports = function($stateProvider) {
  $stateProvider.state('index', {
    url: '',
    abstract: true,
    templateUrl: '/templates/states/layout.html'
  });

  $stateProvider.state('index.view', {
    url: '/',
    templateUrl: '/templates/states/index.html'
  });

  $stateProvider.state('index.usersList', {
    url: '/usersList',
    templateUrl: '/templates/states/usersList.html',
    resolve: {
      users: ['$http', function($http) {
        return $http.get('http://localhost:1337').then(function(res) {
          return res.data.users;
        });
      }]
    },
    controller: ['$scope', 'users', function($scope, users) {
      $scope.users = users;
      $scope.view = 'table';

      $scope.lists = [];
      $scope.groups = _.groupBy(users, 'group');
      var keys = _.sortBy(Object.keys($scope.groups));
      keys.forEach(function(key) {
        var users = $scope.groups[key];
        $scope.lists.push({
          title: key || 'Без группы',
          users: users
        });
      });
      $scope.lists = _.sortBy($scope.lists, 'title');

      $scope.chooseView = function(view) {
        $scope.view = view;
      };

      $scope.sorting = {
        type: 'name',
        direction: 'ASC'
      };

      $scope.sort = function(type) {
        if ($scope.sorting.type == type) {
          $scope.changeSortDirection();
        } else {
          $scope.sorting.type = type;
          $scope.sorting.direction = 'ASC';
        }
        if ($scope.view == 'lists') {
          $scope.sortLists();
        } else {
          $scope.sortUsers();
        }
      };

      $scope.sortLists = function() {
        $scope.lists.forEach(function(list) {
          list.users = _.sortBy(list.users, $scope.sorting.type);
          if ($scope.sorting.direction == 'DESC') {
            list.users = list.users.reverse();
          }
        });
      };

      $scope.sortUsers = function() {
        $scope.users = _.sortBy(users, $scope.sorting.type);
        if ($scope.sorting.direction == 'DESC') {
          $scope.users = $scope.users.reverse();
        }
      };

      $scope.changeSortDirection = function() {
        $scope.sorting.direction = $scope.sorting.direction == 'ASC' ? 'DESC' : 'ASC';
      };

      $scope.$watch('view', function() {
        if ($scope.view == 'lists') {
          $scope.sortLists();
        } else {
          $scope.sortUsers();
        }
      });
    }]
  });
};
