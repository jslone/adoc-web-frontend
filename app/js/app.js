'use strict';


// Declare app level module which depends on filters, and services
angular.module('adocApp', [
  'ngRoute',
  'adocApp.filters',
  'adocApp.services',
  'adocApp.directives',
  'adocApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/home.html'});
  $routeProvider.when('/doc', {templateUrl: 'partials/doc-root.html', controller: 'DocListCtrl'});
  $routeProvider.when('/doc/:id', {templateUrl: 'partials/doc.html', controller: 'DocCtrl'});
  $routeProvider.when('/doc/v/:fullName*\?', {templateUrl: 'partials/doc.html', controller: 'DocCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);
