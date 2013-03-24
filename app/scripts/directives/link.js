'use strict';

angular.module('fdApp').directive('link', function() {
    return {
        restrict: 'E',
        link: function postLink(scope, element) {
            var sheet = element[0].sheet;

            scope.$on('injectfontface', function(scope, rule){
                angular.forEach(rule, function(rule) {
                    sheet.insertRule(rule, 0);
                });
            });
        }
    };
});
