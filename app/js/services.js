'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('adocApp.services', ['ngResource'])
  .value('version', '0.1')
  .factory('Doc', ['$resource',
  	function($resource) {
  		return $resource('/doc/:docId', {userId: '@id'}, {
  			lookup: {method: 'GET', url: '/doc/v/:fullName'},
  			root: {method: 'GET', url: '/doc', isArray: true},
  			children: {method: 'GET', url:'/doc/children/:docId', isArray: true}
  		});
  	}]);
