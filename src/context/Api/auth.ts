import { AxiosInstance, AxiosResponse } from "axios";
import { IOrganizationProps } from "../Organization/types";

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
  access: string;
  refresh: string;
};

export type IUserProfileProps = IUserData & {
  user_organization: IOrganizationProps[];
  date_joined: string;
};

export type IPasswordProps = {
  old_password: string;
  new_password: string;
  confirm_password?: string;
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
    return this.client.post("/account/user/add_user/", userDetails);
  }

  refreshToken(token: string) {
    return this.client.post("/account/auth/token/refresh/", { refresh: token });
  }

  createAdmin(userData) {
    return this.client.post("/account/user/add_admin/", userData);
  }

  resetPassword(data?: IPasswordProps) {
    return this.client.post("/account/user/reset_password/", data);
  }

  getUsers() {
    return this.client.get("/account/user/all_users/");
  }

  getUserProfile(): Promise<AxiosResponse<{ data: IUserProfileProps }>> {
    return this.client.get(`/account/user/profile`);
  }

  editUserProfile(data?: any) {
    return this.client.put(`/account/user/profile`, data);
  }

  deleteUser() {
    return this.client.delete(`/account/user/profile`);
  }
}
