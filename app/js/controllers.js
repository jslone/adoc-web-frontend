'use strict';

/* Controllers */

angular.module('adocApp.controllers', [])
  .controller('DocTreeRootCtrl', ['$scope','Doc',function($scope,Doc) {
  	$scope.docs = Doc.root();
  }]);