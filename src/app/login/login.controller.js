'use strict';
/*jshint esnext: true */

class LoginCtrl {
  constructor($scope, $location, User, Restangular) {
    User.setUser(null);
    this.User = User;
    this.$location = $location;
    this.loginResource = Restangular.all('login');
    this.registerResource = Restangular.all('register');
    this.loginData = {};
    this.error = null;
    if ($location.search().logout) {
      this.error = 'You have been logged out';
    }
  }

  _authenticate(resource, errorMessage) {
    resource.post(this.loginData).then(
      user => {
        this.error = null;
        console.log(user);
        this.User.setUser(user);
        this.$location.path('/trips');
      }, err => {
        this.error = errorMessage;
        console.log(err);
      });
  }

  login() {
    this._authenticate(
      this.loginResource,
      'Username and password does not match!'
    );
  }

  register() {
    this._authenticate(
      this.registerResource,
      'This username is already taken!'
    );
  }
}

LoginCtrl.$inject = ['$scope', '$location', 'User', 'Restangular'];

export
default LoginCtrl;