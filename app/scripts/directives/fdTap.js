  'use strict';

angular.module('fdApp').directive('fdTap', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if('ontouchstart' in window) {
                var tapping = false;

                element.bind('touchstart', function() {
                    tapping = true;
                });

                element.bind('touchmove', function() {
                    tapping = false;
                });

                element.bind('touchcancel', function() {
                    tapping = false;
                });

                element.bind('touchend', function() {
                    if (tapping) {
                        scope.$apply(attrs.fdTap, element);
                    }
                });

            } else {
                element.bind('click', function() {
                    scope.$apply(attrs.fdTap, element);
                });
            }
        }
    };
});