'use strict';
/*jshint esnext: true */

class TripsCtrl {
  constructor($scope, $location, $log, $modal, Restangular, User, TripTools) {

    this.$modal = $modal;
    this.Restangular = Restangular;
    this.TripTools = TripTools;

    this.user = User.getUser();
    User.check();

    this.resource = Restangular.all('trips');
    this.reload();
  }

  reload() {
    this.query = null;
    this.resource.getList({
      sort: 'startDate endDate'
    }).then(data => {
      this.collection = data;
    });
  }

  filter() {
    if (!this.query) {
      return this.reload();
    }
    this.resource.getList({
      conditions: JSON.stringify({
        '$or': [{
          'comment': {
            '$regex': this.query,
            '$options': 'i'
          }
        }, {
          'destination': {
            '$regex': this.query,
            '$options': 'i'
          }
        }]
      })
    }).then(data => {
      this.collection = data;
    });
  }

  edit(item) {
    var editable = item ? this.Restangular.copy(item) : {};
    this.modalInstance = this.$modal.open({
      templateUrl: 'app/trips/trip-form.html',
      controller: 'TripFormCtrl',
      size: 'lg',
      resolve: {
        item: function() {
          return editable;
        }
      }
    });
    this.modalInstance.result.then((item) => {
      this.update(item);
    });
  }

  show(item) {
    this.modalInstance = this.$modal.open({
      templateUrl: 'app/trips/trip-show.html',
      controller: 'TripFormCtrl',
      size: 'lg',
      resolve: {
        item: function() {
          return item;
        }
      }
    });
  }

  update(item) {
    var promise = item._id ? item.put() : this.resource.post(item);
    // promise.then(this.reload.bind(self));
    promise.then(() => {
      this.reload();
    });
  }

  destroy(item) {
    item.remove().then(() => {
      this.reload();
    });
  }
}

TripsCtrl.$inject = ['$scope', '$location', '$log', '$modal', 'Restangular', 'User', 'TripTools'];

export
default TripsCtrl;