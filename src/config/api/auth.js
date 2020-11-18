export default class Auth {
  constructor(client) {
    this.client = client;
  }

  login(userDetails) {
    return this.client.post("/account/auth/", userDetails);
  }

  signup(userData) {
    return this.client.post("/account/add_user/", userData);
  }
}
