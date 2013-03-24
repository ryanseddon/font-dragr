'use strict';

describe('Directive: fdFontList', function () {
  beforeEach(module('fdApp'));

  var element, $rootScope;

  beforeEach(inject(function (_$rootScope_, $compile) {
    $rootScope = _$rootScope_;
    element = angular.element('<div fd-font-list></div>');
    element = $compile(element)($rootScope);
  }));

  it('should replace element with initial font list', function () {
    
    expect(element.hasClass('fonts')).toBe(true);
  });
});
