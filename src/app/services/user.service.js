export
default class User {
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
}