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
            console.log($location.path());
            if($location.path() == '/doc/v/' + doc.fullName) {
              $route.current = lastRoute;
            }
          });
          $location.path('/doc/v/' + doc.fullName);
        });
      }
      else if($routeParams.fullName) {
        $scope.doc = {name: 'testFullName', path: 'test', fullName: 'test/testFullName',children: []};
      }
      else {
        $scope.doc = {name: 'root', path: '', fullName: '', children: []};
      }
  }])
  .controller('DocTreeRootCtrl', ['$scope','Doc',function($scope,Doc) {
  	$scope.docs = Doc.root();
  }]);
