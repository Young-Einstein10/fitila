import { AxiosInstance } from "axios";

export interface UserSigninProps {
  email: string;
  password: string;
}

export default class Auth {
  client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  login(userDetails) {
    return this.client.post("/account/auth/", userDetails);
  }

  signup(userData) {
    return this.client.post("/account/add_user/", userData);
  }
}
