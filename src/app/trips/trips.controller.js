'use strict';
/*jshint esnext: true */

class TripsCtrl {
  constructor($scope, $log, $modal, Restangular) {

    var vm = this;
    var resource = Restangular.all('trips');
    var MS_PER_DAY = 24 * 60 * 60 * 1000;

    vm.dateFormat = 'd MMMM yyyy';

    vm.reload = function() {
      resource.getList().then(function(data) {
        vm.collection = data;
      });
    };

    vm.eta = function(date) {
      date = new Date(date);
      var today = new Date();
      var days = Math.ceil((date - today) / MS_PER_DAY);
      if (days < 1) {
        days = '-';
      }
      return days;
    };

    vm.edit = function(item) {
      var editable = item ? Restangular.copy(item) : {};
      var modalInstance = $modal.open({
        templateUrl: 'app/trips/trip-form.html',
        controller: 'TripFormCtrl',
        resolve: {
          item: function() {
            return editable;
          }
        }
      });

      modalInstance.result.then(vm.update);
    };

    vm.update = function(item) {
      var promise = item._id ? item.put() : resource.post(item);
      promise.then(vm.reload);
    };

    vm.destroy = function(item) {
      item.remove().then(vm.reload);
    };

    vm.reload();
  }
}

TripsCtrl.$inject = ['$scope', '$log', '$modal', 'Restangular'];

export
default TripsCtrl;