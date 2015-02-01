class User {
  constructor(Restangular, $location) {
    this.Restangular = Restangular;
    this.$location = $location;
  }

  setUser(user) {
    this.user = user;
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    if (!this.user) {
      this.user = JSON.parse(sessionStorage.getItem('user'));
    }
    return this.user;
  }

  check() {
    if (!this.user) {
      this.$location.path('/login');
    } else {
      this.Restangular.setDefaultRequestParams({
        'access_token': this.user.token
      });
    }
  }

  setInterceptor() {
    this.Restangular.setErrorInterceptor((response, deferred, responseHandler) => {
      if (response.status === 401) {
        this.$location.search('logout');
        this.$location.path('/login');
      }
    });
  }
}

User.$inject = ['Restangular', '$location'];

export
default User;