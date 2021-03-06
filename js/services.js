'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('adocApp.services', ['ngResource'])
  .value('version', '0.1')
  .factory('Doc', ['$resource', function($resource) {

      function leafMap(data) {
        var data = JSON.parse(data);
        data.map(function (doc) {
          return doc.isLeaf = doc.children.length == 0;
        });
        return data;
      }

  		return $resource('/doc/:docId', {docId: '@id'}, {
  			lookup: {method: 'GET', url: '/doc/v/:fullName'},
  			root: {method: 'GET', url: '/doc', isArray: true,transformResponse:leafMap},
        search: {method: 'GET',url: '/doc/search?query=:query',isArray: true}
  		});
  }])
  .factory('User',['$resource', function($resource) {
    return $resource('/user', null, {
      auth: {method: 'POST', url: '/user/auth'},
      deauth: {method: 'POST', url: '/user/deauth'}
    });
  }]);
