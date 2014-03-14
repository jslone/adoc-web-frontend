'use strict';

/* Directives */


angular.module('adocApp.directives', [])
  .directive('treeView', ['$compile','Doc', function($compile,Doc) {
  	return {
  		restrict: 'AE',
  		link: function(scope,element,attrs) {
        if(attrs.id) {
          scope.doc = Doc.get({id: attrs.id});
        }
        else {
          var doc = {children: scope.docs};
          scope.doc = doc;
        }
  			scope.expand = scope.expand || function(doc) {
          doc.expanded = true;
          if(!doc.loaded) {
            doc.loaded = true;
            var html = $compile('<div tree-view id="' + doc.id + '"></div>')(scope.$new());
            var child = $("#tree\\."+doc.id).append(html);
          }
  			}
  			scope.collapse = scope.collapse || function(doc) {
  				doc.expanded = false;
  			}
  			var template =
  			'<ul class="tree-list">' +
  				'<li data-ng-repeat="doc in doc.children">' +
    				'<div class="tree-header">' +
              '<span class="glyphicon glyphicon-chevron-right" ng-show="!doc.isLeaf && !doc.expanded" ng-click="expand(doc)"></span>' +
              '<span class="glyphicon glyphicon-chevron-down" ng-show="!doc.isLeaf && doc.expanded" ng-click="collapse(doc)"></span>' +
    				  '<span class="glyphicon glyphicon-empty" ng-show="doc.isLeaf"></span>' +
  				    '<a class="tree-name" ng-href="#/doc/{{doc.id}}">{{doc.name}}</a>' +
				    '</div>' +
            '<div class="sub-tree-wrapper" ng-show="doc.expanded" id="tree.{{doc.id}}"></div>' +
          '</li>' +
        '</ul>'

        element.html('').append($compile(template)(scope));
  		}
  	};
  }])
  .directive('dragDrop',[function() {
    return {
      link: function(scope,element,attrs) {
        jQuery.event.props.push("dataTransfer");

        function noDefault(event) {
          if(event.preventDefault)
            event.preventDefault();
          //if(event.preventPropogation)
          //  event.preventPropogation();
        }

        function dragover(event) {
          event.dataTransfer.dropEffect = 'copy';
          noDefault(event);
        }

        function drop(event) {
          noDefault(event);
          scope.file = event.dataTransfer.files[0];
          scope.$apply();
        }

        element.bind('drop',drop);
        element.bind('dragover',dragover);
        element.bind('dragcenter',dragover);
      }
    }
  }]);
