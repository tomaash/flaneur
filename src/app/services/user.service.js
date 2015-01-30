export
default class User {
  constructor(Restangular, $location) {
    this.Restangular = Restangular;
    this.$location = $location;
    this.MS_PER_DAY = 24 * 60 * 60 * 1000;
    this.COMMENT_TRIM_LENGTH = 50;
    this.dateFormat = 'd MMMM yyyy';
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
}