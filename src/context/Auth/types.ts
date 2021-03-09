import { AxiosResponse } from "axios";

interface ContextProps {
  auth: AuthProps;
  setAuth: React.Dispatch<React.SetStateAction<AuthProps>>;
  login: (userData: { email: string, password: string }) => Promise<AxiosResponse<any>>;
  signOut: () => void;
}

interface AuthProps {
  isAuthenticated: boolean;
  user: {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
    token?: string;
  };
}


export type { ContextProps, AuthProps }