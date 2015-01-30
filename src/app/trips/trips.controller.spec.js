'use strict';

describe('Trips Controller', function() {
  var scope, $httpBackend, controller;

  var tripsMock = [{
    '_id': '1',
    'destination': 'foo',
    'startDate': '2015-01-28T23:00:00.000Z',
    'endDate': '2015-01-30T23:00:00.000Z',
    'comment': 'abc',
    'user': '10'
  }, {
    '_id': '2',
    'destination': 'bar',
    'startDate': '2015-01-28T23:00:00.000Z',
    'endDate': '2015-01-30T23:00:00.000Z',
    'comment': 'def',
    'user': '20'
  }];

  beforeEach(module('flaneur'));

  beforeEach(inject(function($rootScope, $controller, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    controller = $controller('TripsCtrl as vm', {
      $scope: scope
    });
    $httpBackend.expectGET('/api/trips').respond(tripsMock);
    $httpBackend.flush();
  }));

  it('should have stuff on scope', function() {
    expect(scope.vm.$modal).toBeTruthy();
    expect(scope.vm.Restangular).toBeTruthy();
    expect(scope.vm.resource).toBeTruthy();
  });

  it('constructor should get data', function() {
    expect(scope.vm.collection[0].destination).toEqual('foo');
    expect(scope.vm.collection.length).toEqual(2);
    expect(scope.vm.collection[0].save).toEqual(jasmine.any(Function));
  });

  it('updating item should save to server and reload', function() {
    $httpBackend.expectPUT('/api/trips/1').respond(200);
    $httpBackend.expectGET('/api/trips').respond(tripsMock);
    var item = scope.vm.collection[0];
    scope.vm.update(item);
    $httpBackend.flush();
  });

  it('deleting item should save to server and reload', function() {
    $httpBackend.expectDELETE('/api/trips/1').respond(200);
    $httpBackend.expectGET('/api/trips').respond(tripsMock);
    var item = scope.vm.collection[0];
    scope.vm.destroy(item);
    $httpBackend.flush();
  });

  it('edit should open modal', function() {
    var item = scope.vm.collection[0];
    scope.vm.edit(item);
    expect(scope.vm.modalInstance.opened).toBeTruthy();
  });
  
  it('filter should call server with query', function() {
    $httpBackend.expectGET(/\/api\/trips\?conditions=.*foo.*foo.*/).respond(tripsMock);
    scope.vm.query='foo';
    scope.vm.filter();
    $httpBackend.flush();
  });
});