'use strict';

describe('Controller: GalleryCtrl', function () {

  // load the controller's module
  beforeEach(module('fdApp'));

  var GalleryCtrl, scope, $httpBackend

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/gallery/gallery.json').
      respond([{name: 'VomZom'}, {name: 'Lobster'}]);

    scope = $rootScope.$new();
    GalleryCtrl = $controller('GalleryCtrl', {
      $scope: scope
    });
  }));

  it('should create "gallery" model with two fonts', function () {
    expect(scope.gallery).toBeUndefined();
    $httpBackend.flush();
    expect(scope.gallery.length).toBe(2);
    expect(scope.gallery).toEqual([{name: 'VomZom'}, {name: 'Lobster'}]);
  });
});
