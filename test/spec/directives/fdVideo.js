'use strict';

describe('Directive: fdVideo', function () {
  beforeEach(module('fdApp'));

  var element;

  it('should replace "fd-video" with iframe', inject(function ($rootScope, $compile) {
    element = angular.element('<div fd-video src="foo" width="100" height="100"></div>');
    element = $compile(element)($rootScope);
    expect(element[0].nodeName).toBe('IFRAME');
    expect(element.attr('src')).toBe('foo');
    expect(element.attr('width')).toBe('100');
    expect(element.attr('height')).toBe('100');
    expect(element.attr('frameborder')).toBe('0');
  }));
});
