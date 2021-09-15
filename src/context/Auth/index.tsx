import React, { useState, createContext, FC, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useApiContext } from "../Api";
import { AuthProps, ContextProps, IUserProps } from "./types";
import { IUserData } from "../Api/auth";
import { PageSpinner } from "../../components/pageSpinner";

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
  const authData = JSON.parse(userData) as IUserProps;

  const refreshToken = async token => {
    try {
      setIsLoading(true);

      // Get New access token using refresh token and save update value in local storage
      const { data } = await api.refreshToken(token);

      const { access, refresh } = data;

      localStorage.setItem(
        "userData",
        JSON.stringify({ ...authData, access, refresh })
      );

      setApiHeaders(data.access);

      setIsLoading(false);

      return { access, refresh, success: true };
    } catch (error) {
      setIsLoading(false);
      return { access: "", refresh: "", success: false };
    }
  };

  const checkAuthState = async () => {
    const isSignedIn = async () => {
      if (userData) {
        const authData = JSON.parse(userData) as IUserProps;
        const { access, refresh } = authData;

        try {
          const accessToken = jwt_decode(access) as any;
          const rToken = jwt_decode(refresh) as any;

          // console.log({ access: accessToken, refresh: jwt_decode(refresh) });

          if (accessToken.exp < new Date().getTime() / 1000) {
            const { success } = await refreshToken(refresh);

            return success;
          }

          if (rToken.exp < new Date().getTime() / 1000) {
            return false;
          }
        } catch (error) {
          console.log(error);

          setAuth({
            isAuthenticated: false,
            user: null,
          });
          setIsLoading(false);

          return false;
        }

        return true;
      }
      return false;
    };

    const isLoggedIn = await isSignedIn();

    if (isLoggedIn) {
      const userData = localStorage.getItem("userData");
      const userDetails = JSON.parse(userData!) as IUserProps;

      setApiHeaders(userDetails.access);

      setAuth({
        isAuthenticated: true,
        user: userDetails,
      });
    } else {
      setAuth({
        isAuthenticated: false,
        user: null,
      });
    }
  };

  useEffect(() => {
    checkAuthState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const signOut = history => {
    localStorage.removeItem("userData");
    setAuth({
      isAuthenticated: false,
      user: { access: "", refresh: "" },
    });

    // window.location.href = "/signin";
    history.push("/");
  };

  if (isLoading) {
    return <PageSpinner />;
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
