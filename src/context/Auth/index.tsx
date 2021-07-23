import React, { useState, createContext, FC, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useApiContext } from "../Api";
import { AuthProps, ContextProps } from "./types";

const AuthContext = createContext<ContextProps | undefined>(undefined);

const AuthProvider: FC = ({ children }) => {
  const [auth, setAuth] = useState<AuthProps>({
    isAuthenticated: false,
    user: {},
  });

  const { setApiHeaders, auth: api } = useApiContext();

  const userData = localStorage.getItem("userData");

  useEffect(() => {
    const checkAuth = () => {
      if (userData) {
        const { token } = JSON.parse(userData);

        try {
          const jwtToken = jwt_decode(token) as any;

          if (jwtToken.exp < new Date().getTime() / 1000) {
            return false;
          }
        } catch (error) {
          return false;
        }

        return true;
      }
      return false;
    };

    if (checkAuth()) {
      const userDetails = JSON.parse(userData!);

      setApiHeaders(userDetails.token);

      setAuth({
        isAuthenticated: true,
        user: userDetails,
      });
    }
  }, [userData, setApiHeaders]);

  const login = async (userData: { email: string; password: string }) => {
    try {
      const res = await api.login(userData);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = () => {
    localStorage.removeItem("userData");
    setAuth({
      isAuthenticated: false,
      user: {},
    });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuthContext() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuthContext };
