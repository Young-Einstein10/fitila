import { AxiosResponse } from "axios";

interface ContextProps {
  auth: AuthProps;
  setAuth: React.Dispatch<React.SetStateAction<AuthProps>>;
  login: (userData: { email: string, password: string }) => Promise<AxiosResponse<any>>;
  signOut: () => void;
}


interface IUserProps {

  id?: number;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  token?: string;
}

interface AuthProps {
  isAuthenticated: boolean;
  user: IUserProps
}


export type { ContextProps, AuthProps, IUserProps }