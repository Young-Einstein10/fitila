import { AxiosResponse } from "axios";
import { IUserData, UserSigninProps, IUserResponseProps } from "../Api/auth";

interface ContextProps {
  auth: AuthProps;
  setAuth: React.Dispatch<React.SetStateAction<AuthProps>>;
  login: (userData: UserSigninProps) => Promise<AxiosResponse<{ data: IUserResponseProps}>>;
  signup: (userData: IUserData) => Promise<AxiosResponse<{data: IUserResponseProps}>>;
  signOut: (history: any) => void;
}


interface IUserProps {
  id?: number;
  name?: string;
  first_name?: string;
  last_name?: string;
  is_admin?: boolean;
  is_staff?: boolean;
  email?: string;
  profile_pics_url?: string;
  phone?: string;
  access: string;
  refresh: string;
}

interface AuthProps {
  isAuthenticated: boolean;
  user: IUserProps
}


export type { ContextProps, AuthProps, IUserProps }