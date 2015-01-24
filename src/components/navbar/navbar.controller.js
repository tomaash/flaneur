'use strict';
/*jshint esnext: true */

class NavbarCtrl {
  constructor ($scope, User) {
    $scope.date = new Date();
    $scope.User = User;
  }
}

NavbarCtrl.$inject = ['$scope', 'User'];

export default NavbarCtrl;
