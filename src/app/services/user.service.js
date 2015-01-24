export
default class User {
  setUser(user) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
  	if (!this.user) {
  		this.user = JSON.parse(localStorage.getItem('user'));
  	}
    return this.user;
  }
}