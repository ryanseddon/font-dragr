'use strict';

describe('Filter: jsonfile', function () {

  // load the filter's module
  beforeEach(module('fdApp'));

  // initialize a new instance of the filter before each test
  var jsonfile;
  beforeEach(inject(function($filter) {
    jsonfile = $filter('jsonfile');
  }));

  it('should return the input prefixed with "jsonfile filter:"', function () {
    var payload = {
      "fontName":"http:\/\/fontdragr.com\/gallery\/VomZom\/vomzom.ttf",
      "fontSize":15236,
      "fontDataURL":"AAEAAAAQA6g="
    },
    font = jsonfile(payload)
    expect(font[0].name).toBe('vomzom');
    expect(font[0].size).toBe('15kb');
    expect(font[0].result).toBe('data:application/octet-stream;base64,AAEAAAAQA6g=');
  });

});
