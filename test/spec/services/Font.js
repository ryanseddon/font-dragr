'use strict';

describe('Service: Font', function () {

  // load the service's module
  beforeEach(module('fdApp'));

  // instantiate service
  var Font;
  beforeEach(inject(function(_Font_) {
    Font = _Font_;
  }));

  it('should shared Font service', function () {
    expect(!!Font).toBe(true);
  });

  it('should default "activeFont" to "VomZom"', function () {
    expect(Font.activeFont).toEqual('VomZom');
  });

});
