'use strict';

angular.module('fdApp').directive('fdFontList', ['Font', function(Font) {
    var template = [
        '<ul id="fonts" class="fonts">',
          '<li ng-repeat="font in fonts" fd-tap="updateFont()" ng-class="{active: font.active}">',
            '<div tabindex="0" ng-style="{ \'font-family\': font.name }">',
              '<span>{{font.name}}</span>',
              '<div tabindex="0" class="info01">',
                  '<ul>',
                      '<li class="title">',
                          '<strong ng-style="{ \'font-family\': font.name }">{{font.name}}</strong>',
                      '</li>',
                      '<li>',
                          '<strong>Size</strong> {{font.size}}',
                      '</li>',
                      '<li>',
                          '<strong>Author</strong> <a href="{{font.authorurl}}">{{font.author}}</a>',
                      '</li>',
                      '<li>',
                          '<strong>License</strong> <a href="{{font.licenseurl}}">{{font.license}}</a>',
                      '</li>',
                  '</ul>',
              '</div>',
            '</div>',
          '</li>',
        '</ul>'
    ].join('');

    return {
        restrict: 'A',
        replace: true,
        template: template,
        link: function(scope) {
          scope.updateFont = function() {
              angular.forEach(scope.fonts, function(font) {
                  font.active = false;
              });

              this.font.active = true;
              Font.activeFont = this.font.name;
          };
        }
    };
}]);
