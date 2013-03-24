'use strict';

describe('Filter: fontfacecss', function () {

  // load the filter's module
  beforeEach(module('fdApp'));

  // initialize a new instance of the filter before each test
  var fontfacecss;
  beforeEach(inject(function($filter) {
    fontfacecss = $filter('fontfacecss');
  }));

  it('should return the input prefixed with "fontfacecss filter:"', function () {
    var payload = [{
          "result": "blob:e9713970-2b60-094f-9d1a-1c641d32804f",
          "name": "Strato",
          "size": "37kb",
          "author": "",
          "authorurl": "",
          "license": "",
          "licenseurl": ""
    }],
    fontface = fontfacecss(payload);

    expect(fontface).toEqual(["@font-face{font-family: Strato; src:url(blob:e9713970-2b60-094f-9d1a-1c641d32804f);}"]);
  });

});
