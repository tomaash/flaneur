'use strict';

describe('TripTools Service', function() {
  var TripTools;

  beforeEach(module('flaneur'));

  beforeEach(inject(function(_TripTools_) {
    TripTools = _TripTools_;
  }));

  it('eta should return remaining days', function() {
    var msDay = 24 * 60 * 60 * 1000;
    var tomorrow = new Date(new Date().getTime() + msDay);
    var yesterday = new Date(new Date().getTime() - msDay);
    expect(TripTools.eta(tomorrow)).toEqual(1);
    expect(TripTools.eta(yesterday)).toEqual('-');
    expect(TripTools.eta(new Date())).toEqual('Today!');
  });

  it('trimComment should trim to max length', function() {
    var comment = 'foo bar baz foo bar baz foo bar baz foo bar baz foo bar baz foo bar baz';
    expect(TripTools.trimComment(comment).length).toBeLessThan(51);
    expect(TripTools.trimComment('foo')).toEqual('foo');
  });
});