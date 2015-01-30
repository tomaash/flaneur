'use strict';
/*jshint esnext: true */

export
default class TripsCtrl {
  constructor($scope, $location, $log, $modal, Restangular, User) {

    this.$modal = $modal;
    this.Restangular = Restangular;

    this.user = User.getUser();
    if (!this.user) {
      $location.path('/login');
    } else {
      Restangular.setDefaultRequestParams({
        'access_token': this.user.token
      });
    }

    this.resource = Restangular.all('trips');
    this.MS_PER_DAY = 24 * 60 * 60 * 1000;
    this.COMMENT_TRIM_LENGTH = 50;

    this.dateFormat = 'd MMMM yyyy';

    this.reload();
  }

  reload() {
    this.query = null;
    this.resource.getList().then(data => {
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

  trimComment(str) {
    return S(str).truncate(this.COMMENT_TRIM_LENGTH).s;
  }

  eta(date) {
    date = new Date(date);
    var today = new Date();
    var days = Math.ceil((date - today) / this.MS_PER_DAY);
    if (days === 0) {
      days = 'Today!';
    }
    else if (isNaN(days) || days < 0) {
      days = '-';
    }
    return days;
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