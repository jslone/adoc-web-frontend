'use strict';

/* Directives */


angular.module('adocApp.directives', [])
  .directive('treeView', ['$compile','Doc', function($compile,Doc) {
  	return {
  		restrict: 'AE',
  		link: function(scope,element,attrs) {
  			console.log(attrs);
        if(attrs.id) {
  				var docs = Doc.children({id: attrs.id});
          scope.docs = docs;
        }
  			scope.expand = scope.expand || function(doc) {
          doc.expanded = true;
          if(!doc.loaded) {
            doc.loaded = true;
            var html = $compile('<div tree-view id="' + doc.id + '"></div>')(scope.$new());
            console.log("#tree." + doc.id);
            var child = $("#tree\\."+doc.id).append(html);
          }
  			}
  			scope.collapse = scope.collapse || function(doc) {
  				doc.expanded = false;
  			}
  			var template =
  			'<ul style="list-style-type:none;margin-left:14px;">' +
  				'<li data-ng-repeat="doc in docs">' +
  					'<span class="glyphicon glyphicon-chevron-right" ng-show="doc.children.length && !doc.expanded" ng-click="expand(doc)"></span>' +
   					'<span class="glyphicon glyphicon-chevron-down" ng-show="doc.children.length && doc.expanded" ng-click="collapse(doc)"></span>' +
   					'<span class="glyphicon glyphicon-empty" ng-hide="doc.children.length"></span>' +
   					'<a ng-href="#/doc/{{doc.id}}">{{doc.name}}</a>' +
   					'<div ng-show="doc.expanded" id="tree.{{doc.id}}"></div>' +
   				'</li>' +
   			'</ul>'

   			element.html('').append($compile(template)(scope));
  		}
  	};
  }]);
