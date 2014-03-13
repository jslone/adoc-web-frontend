'use strict';

/* Controllers */

angular.module('adocApp.controllers', [])
  .controller('DocCtrl', ['$scope','$location','$route','$routeParams','Doc',
    function($scope,$location,$route,$routeParams,Doc) {
      if($routeParams.id) {
        $scope.doc = Doc.get({id: $routeParams.id},function(doc) {
          //change to pretty url without reloading page
          var lastRoute = $route.current;
          $scope.$on('$locationChangeSuccess', function() {
            if($location.path() == '/doc/v/' + doc.fullName) {
              $route.current = lastRoute;
            }
          });
          $location.path('/doc/v/' + doc.fullName);
        });
      }
      else {
        $scope.doc = Doc.lookup({fullName: $routeParams.fullName});
      }
      $scope.nonBuiltins = function (doc) {
        var filtered = Object.create(doc);
        var filters = ['id','name','path','fullName','children','write','read','createdAt','updatedAt'];
        for(var i = 0; i < filters.length; i++) {
          delete filtered[filters[i]];
        }
        return filtered;
      }
  }])
  .controller('DocListCtrl', ['$scope','Doc',function($scope,Doc) {
  	$scope.docs = Doc.root();
  }])
  .controller('UserCtrl',['$scope','$rootScope','User',function($scope,$rootScope,User) {
    if(!$rootScope.user)
      $rootScope.user = User.get();

    $scope.$on('login',function(event) {
      $scope.login();
    });

    $scope.login = function(user) {
      if(user) {
        $rootScope.user = User.auth(user);
      }
      else {
        $rootScope.user = User.get();
      }
    }

    $scope.logout = function() {
      User.deauth();
      $rootScope.user = null;
      $scope.auser = null;
    }

    $scope.newUser = function(user) {
      var newUser = new User(user);
      newUser.$save().then(
        function(value) {
          $scope.err = false;
          $scope.nuser = null;
          $rootScope.$broadcast('login',value);
        },
        function(error) {$scope.err = error}
      );
    }
  }]);
