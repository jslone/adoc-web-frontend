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
  $routeProvider.when('/doc/:id?', {templateUrl: 'partials/doc.html', controller: 'DocCtrl'});
  $routeProvider.when('/doc/v/:fullName*\?', {templateUrl: 'partials/doc.html', controller: 'DocCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);

$('#adoc-nav-tree').tree({dataSource: {data: function(option,callback) {
	console.log(option);
	if (!option.name) {
		callback({data: [{name: 'foo', type: 'folder'}]});
	}
	else {
		callback({data: [{name: 'bar', type: 'folder'}]});
	}
}}});