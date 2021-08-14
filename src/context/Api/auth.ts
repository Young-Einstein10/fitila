import { AxiosInstance, AxiosResponse } from "axios";

export type UserSigninProps = Pick<IUserData, "email" | "password">;

export type IUserData = {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  password: string;
};

export type IUserResponseProps = IUserData & {
  is_admin: boolean;
  token: string;
};

export default class Auth {
  client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  login(
    userDetails: UserSigninProps
  ): Promise<AxiosResponse<{ data: IUserResponseProps }>> {
    return this.client.post("/account/auth/", userDetails);
  }

  signup(userDetails: IUserData): Promise<AxiosResponse<IUserResponseProps>> {
    return this.client.post("/account/add_user/", userDetails);
  }

  createAdmin(userData) {
    return this.client.post("/account/add_admin/", userData);
  }

  getUsers() {
    return this.client.get("/account/get_user/");
  }

  editUser(id: string) {
    return this.client.get(`/account/user/${id}`);
  }
}
