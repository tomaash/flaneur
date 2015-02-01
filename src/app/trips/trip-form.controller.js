'use strict';
/*jshint esnext: true */

class TripFormCtrl {
  constructor($scope, $modalInstance, item, TripTools) {
    $scope.TripTools = TripTools;
    $scope.item = item;
    $scope.today = new Date();

    $scope.dateFormat = 'dd MMMM yyyy';

    $scope.minEndDate = function() {
      return $scope.item.startDate || $scope.today;
    };

    $scope.dateRangeValid = function() {
      if (!$scope.item.startDate || !$scope.item.endDate) {
        return true;
      }
      return $scope.item.startDate <= $scope.item.endDate;
    };


    if (item._id) {
      $scope.editMode = true;
    }

    var killEvent = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
    };
    $scope.ok = function() {
      $modalInstance.close($scope.item);
    };
    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
    $scope.openEnd = function($event) {
      killEvent($event);
      $scope.openedEnd = true;
      $scope.openedStart = false;
    };
    $scope.openStart = function($event) {
      killEvent($event);
      $scope.openedStart = true;
      $scope.openedEnd = false;
    };
  }
}

TripFormCtrl.$inject = ['$scope', '$modalInstance', 'item', 'TripTools'];

export
default TripFormCtrl;