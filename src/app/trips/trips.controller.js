'use strict';
/*jshint esnext: true */

class TripsCtrl {
  constructor($scope, $log, $modal, Restangular) {

    var vm = this;
    var resource = Restangular.all('trips');

    vm.dateFormat = 'dd MMMM yyyy';

    vm.reload = function() {
      resource.getList().then(function(data) {
        vm.collection = data;
      });
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

      modalInstance.result.then(function(selectedItem) {
        var itemPromise;
        if (selectedItem._id) {
          itemPromise = selectedItem.put();
        } else {
          itemPromise = resource.post(selectedItem);
        }
        itemPromise.then(function(){
          vm.reload();
        });
      }, function() {
        // Modal canceled
        // $log.info('Modal dismissed at: ' + new Date());
      });
    };

    vm.destroy = function(item) {
      item.remove().then(function() {
        vm.reload();
      });
    };

    vm.reload();
  }
}

TripsCtrl.$inject = ['$scope', '$log', '$modal', 'Restangular'];

export
default TripsCtrl;