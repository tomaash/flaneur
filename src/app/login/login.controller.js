'use strict';
/*jshint esnext: true */

class LoginCtrl {
  constructor($scope, $location, User, Restangular) {
    this.User = User;
    this.$location = $location;
    this.loginResource = Restangular.all('login');
    this.registerResource = Restangular.all('register');
    this.loginData = {};
    this.error = null;
    // User.setUser({username:'foo'});
  }

  login() {
    this.loginResource.post(this.loginData).then(
      user => {
        this.error = null;
        console.log(user);
        this.User.setUser(user);
        this.$location.path('/trips');
      }, err => {
        this.error = 'Username and password does not match!';
        console.log(err);
      });
    // console.log(this.loginData);
    // this.error = 'Bad comand or filename';
  }
}

LoginCtrl.$inject = ['$scope', '$location', 'User', 'Restangular'];

export
default LoginCtrl;