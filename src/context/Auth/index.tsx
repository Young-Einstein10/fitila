import React, { useState, createContext, FC, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useApiContext } from "../Api";
import { AuthProps, ContextProps, IUserProps } from "./types";
import { IUserData } from "../Api/auth";

const AuthContext = createContext<ContextProps | undefined>(undefined);

const AuthProvider: FC = ({ children }) => {
  const [auth, setAuth] = useState<AuthProps>({
    isAuthenticated: false,
    user: {
      access: "",
      refresh: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const { setApiHeaders, auth: api } = useApiContext();

  const userData = localStorage.getItem("userData");

  useEffect(() => {
    const checkAuthState = async () => {
      const isSignedIn = async () => {
        if (userData) {
          const authData = JSON.parse(userData) as IUserProps;
          const { access, refresh } = authData;

          try {
            const accessToken = jwt_decode(access) as any;
            const refreshToken = jwt_decode(refresh) as any;

            // console.log({ access: accessToken, refresh: jwt_decode(refresh) });

            if (accessToken.exp < new Date().getTime() / 1000) {
              setIsLoading(true);

              // Get New access token using refresh token and save update value in local storage
              const { data } = await api.refreshToken(refresh);

              localStorage.setItem(
                "userData",
                JSON.stringify({ ...authData, access: data.access })
              );

              setIsLoading(false);
              return true;
            }

            if (refreshToken.exp < new Date().getTime() / 1000) {
              return false;
            }
          } catch (error) {
            return false;
          }

          return true;
        }
        return false;
      };

      const isLoggedIn = await isSignedIn();

      if (isLoggedIn) {
        const userDetails = JSON.parse(userData!) as IUserProps;

        setApiHeaders(userDetails.access);

        setAuth({
          isAuthenticated: true,
          user: userDetails,
        });
      }
    };

    checkAuthState();
  }, [userData, api, setApiHeaders]);

  const login = async (userData: { email: string; password: string }) => {
    try {
      const res = await api.login(userData);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const signup = async (userData: IUserData) => {
    try {
      const res = await api.signup(userData);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = () => {
    localStorage.removeItem("userData");
    setAuth({
      isAuthenticated: false,
      user: { access: "", refresh: "" },
    });

    window.location.href = "/signin";
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, signup, signOut }}>
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
