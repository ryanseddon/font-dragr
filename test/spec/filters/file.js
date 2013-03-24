'use strict';

describe('Filter: file', function () {

  // load the filter's module
  beforeEach(module('fdApp'));

  // initialize a new instance of the filter before each test
  var file;
  beforeEach(inject(function($filter, $window) {
    file = $filter('file');
    $window.URL = {
      createObjectURL: function() {
        return 'blob:a2db3325-1d44-6b4b-936b-8ee7923f780c';
      }
    };
  }));

  it('should return a dropped file as object', function () {
    var payload = [{
      name: 'Lobster.woff',
      size: 54788
    }],
    font = file(payload);
    expect(font[0].name).toBe('Lobster');
    expect(font[0].size).toBe('54kb');
    expect(font[0].result).toBe('blob:a2db3325-1d44-6b4b-936b-8ee7923f780c');
  });

});
