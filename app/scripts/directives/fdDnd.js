'use strict';

angular.module('fdApp').directive('fdDnd', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('drop', function(e) {
                e.preventDefault();
                scope.$apply(function(self) {
                    self[attrs.fdDnd](e.dataTransfer);
                });
            });

            element.bind('dragenter', function(e) {
                e.preventDefault();
            });

            element.bind('dragover', function(e) {
                e.preventDefault();
            });
        }
    };
});
