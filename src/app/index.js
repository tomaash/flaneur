'use strict';
/*jshint esnext: true */

import MainCtrl from './main/main.controller';
import TripsCtrl from './trips/trips.controller';
import NavbarCtrl from '../components/navbar/navbar.controller';

angular.module('flaneur', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ui.bootstrap'])
  .controller('MainCtrl', MainCtrl)
  .controller('NavbarCtrl', NavbarCtrl)
  .controller('TripsCtrl', TripsCtrl)
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('trips', {
        url: '/trips',
        templateUrl: 'app/trips/trips.html',
        controller: 'TripsCtrl'
      });

    $urlRouterProvider.otherwise('/trips');
  })
  .config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRestangularFields({
      id: '_id'
    });
  });