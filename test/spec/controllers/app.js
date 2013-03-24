'use strict';

describe('Controller: AppCtrl', function () {

  // load the controller's module
  beforeEach(module('fdApp'));

  var AppCtrl, scope, Font, $location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _Font_, $location) {
    scope = $rootScope.$new();
    Font = _Font_;
    AppCtrl = $controller('AppCtrl', {
      $scope: scope
    });

    $location.path = function() {
      return '/testpath';
    };
  }));

  it('should attach "VomZom" font to the scope', function () {
    expect(scope.fonts.length).toBe(1);
    expect(scope.fonts[0].name).toBe("VomZom");
    expect(scope.fonts[0].active).toBe(true);
  });

  it('should make "VomZom" the intial active font', function () {
    expect(scope.font.activeFont).toBe("VomZom");
  });

  it('should return true when checking routeIs method', function () {
    expect(scope.routeIs('/testpath')).toBe(true);
  });
});
