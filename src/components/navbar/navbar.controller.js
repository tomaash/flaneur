'use strict';
/*jshint esnext: true */

class NavbarCtrl {
  constructor($scope, $state, User) {
    $scope.date = new Date();
    $scope.User = User;
    $scope.state = $state;
  }
}

NavbarCtrl.$inject = ['$scope', '$state', 'User'];

export
default NavbarCtrl;