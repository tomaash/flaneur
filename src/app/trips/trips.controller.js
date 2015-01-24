'use strict';
/*jshint esnext: true */

class TripsCtrl {
  constructor($scope, $location, $log, $modal, Restangular, User) {

    var vm = this;
    vm.user = User.getUser();
    if (!vm.user) {
      $location.path('/login');
    } else {
      Restangular.setDefaultRequestParams({
        'access_token': vm.user.token
      });
    }

    var resource = Restangular.all('trips');
    var MS_PER_DAY = 24 * 60 * 60 * 1000;

    vm.dateFormat = 'd MMMM yyyy';

    vm.reload = function() {
      vm.query = null;
      resource.getList().then(function(data) {
        vm.collection = data;
      });
    };

    vm.filter = function() {
      if (!vm.query) {
        return vm.reload();
      }
      resource.getList({
        conditions: JSON.stringify({
          "$or": [{
            "comment": {
              "$regex": vm.query
            }
          }, {
            "destination": {
              "$regex": vm.query
            }
          }]
        })
      }).then(function(data) {
        vm.collection = data;
      });
    };

    vm.eta = function(date) {
      date = new Date(date);
      var today = new Date();
      var days = Math.ceil((date - today) / MS_PER_DAY);
      if (isNaN(days) || days < 1) {
        days = '-';
      }
      return days;
    };

    vm.edit = function(item) {
      var editable = item ? Restangular.copy(item) : {};
      var modalInstance = $modal.open({
        templateUrl: 'app/trips/trip-form.html',
        controller: 'TripFormCtrl',
        size: 'lg',
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

TripsCtrl.$inject = ['$scope', '$location', '$log', '$modal', 'Restangular', 'User'];

export
default TripsCtrl;