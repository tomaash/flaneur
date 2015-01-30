'use strict';
/*jshint esnext: true */

class PlanCtrl {
  constructor($scope, User, Restangular, TripTools) {
    this.Restangular = Restangular;
    this.TripTools = TripTools;

    this.user = User.getUser();
    User.check();

    this.resource = Restangular.all('trips');
    this.reload();
  }

  reload() {
    this.start = moment().startOf('month').add(1, 'months').toDate();
    this.end = moment().add(1, 'months').endOf('month').toDate();

    this.resource.getList({
      sort: 'startDate endDate',
      conditions: JSON.stringify({
        startDate: {
          '$gte': this.start,
          '$lte': this.end,
        }
      })
    }).then(data => {
      this.collection = data;
    });
  }
}

PlanCtrl.$inject = ['$scope', 'User', 'Restangular', 'TripTools'];

export
default PlanCtrl;