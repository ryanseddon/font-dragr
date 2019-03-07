'use strict';

angular.module('fdApp').directive('fdVideo', function() {
  return {
    template: '<iframe frameborder="0"></iframe>',
    restrict: 'A',
    replace: true,
    scope: {
        src: '@',
        width: '@',
        height: '@'
    }
  };
});
