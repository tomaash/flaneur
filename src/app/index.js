'use strict';
/*jshint esnext: true */

import User from './services/user.service';

import MainCtrl from './main/main.controller';
import LoginCtrl from './login/login.controller';
import TripsCtrl from './trips/trips.controller';
import TripFormCtrl from './trips/trip-form.controller';
import NavbarCtrl from '../components/navbar/navbar.controller';

angular.module('flaneur', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ui.bootstrap'])
  .service('User', User)
  .controller('LoginCtrl', LoginCtrl)
  .controller('NavbarCtrl', NavbarCtrl)
  .controller('TripsCtrl', TripsCtrl)
  .controller('TripFormCtrl', TripFormCtrl)
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('trips', {
        url: '/trips',
        templateUrl: 'app/trips/trips.html',
        controller: 'TripsCtrl as vm'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl as vm'
      });

    $urlRouterProvider.otherwise('/trips');
  })
  .config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRestangularFields({
      id: '_id'
    });
  });