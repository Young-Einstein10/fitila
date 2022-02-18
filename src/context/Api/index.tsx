import React, { createContext, FC, useEffect } from "react";
import { useErrorDispatch } from "../Error";
import axios, { AxiosInstance } from "axios";
import Auth from "./auth";
import Organization from "./organization";
import Ecosystem from "./ecosystem";
import Sector from "./sector";
import FAQ from "./faq";

interface ApiProps {
  auth: Auth;
  organization: Organization;
  ecosystem: Ecosystem;
  sector: Sector;
  faq: FAQ;
  HttpClient: AxiosInstance;
}

interface ContextProps extends ApiProps {
  setApiHeaders: (token: string) => void;
}

const ApiContext = createContext<ContextProps | undefined>(undefined);

const BASE_URL = process.env.REACT_APP_BASE_URL;

//Staging endpoint
const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  withCredentials: true,
});

const api: ApiProps = {
  HttpClient: axiosInstance,
  auth: new Auth(axiosInstance),
  ecosystem: new Ecosystem(axiosInstance),
  sector: new Sector(axiosInstance),
  faq: new FAQ(axiosInstance),
  organization: new Organization(axiosInstance),
};

const ApiProvider: FC = ({ children }) => {
  const dispatch = useErrorDispatch();

  useEffect(() => {
    //Intercept For Error reset
    axiosInstance.interceptors.request.use(
      function(config: any) {
        // Reset error state before making a fresh API call
        dispatch({
          type: "RESET_ERROR",
        });

        return config;
      },
      function(error: any) {
        return Promise.reject(error);
      }
    );

    //Intercept For Errors
    axiosInstance.interceptors.response.use(
      function(response) {
        // Do something with response data
        return response;
      },
      async function(error) {
        // console.log(error.response);
        // Do something with response error
        const errorResponse = error.response;
        const originalConfig = error.config;

        if (
          errorResponse.config.url ===
            "/account/user/forget_password/confirm/" ||
          errorResponse.config.url === "/account/user/forget_password/" ||
          errorResponse.config.url === "/account/otp/"
        ) {
          return Promise.reject(error);
        }

        if (errorResponse.data.detail === "Token is blacklisted") {
          // login again to get new set of tokens
          setApiHeaders("");

          localStorage.removeItem("userData");

          window.location.href = "/signin";

          dispatch({
            type: "GET_ERRORS",
            payload: {
              message: "Session has expired. Please login again.",
            },
          });

          // return Promise.reject(error);
        }

        if (
          errorResponse.status === 401 &&
          errorResponse.data.detail !== "Token is blacklisted" &&
          !originalConfig._retry
        ) {
          originalConfig._retry = true;

          const stringedAuthData = localStorage.getItem("userData");
          const userData = JSON.parse(stringedAuthData!);

          try {
            const { data } = await axiosInstance.post(
              "/account/auth/token/refresh/",
              {
                refresh: userData.refresh,
              }
            );

            // console.log({ data });

            const { access, refresh } = data;

            localStorage.setItem(
              "userData",
              JSON.stringify({ ...userData, access, refresh })
            );

            originalConfig.headers["authorization"] = `Bearer ${access}`;
            setApiHeaders(access);

            return axiosInstance(originalConfig);
          } catch (error) {
            // return Promise.reject(error);
          }
        }

        errorResponse &&
          dispatch({
            type: "GET_ERRORS",
            payload: {
              message:
                typeof errorResponse.data.error === "string"
                  ? errorResponse.data.error
                  : errorResponse.data.errors &&
                    errorResponse.data.errors.length &&
                    errorResponse.data.errors[0]
                  ? errorResponse.data.errors.toString()
                  : typeof errorResponse.data.error === "object"
                  ? Object.entries(errorResponse.data.error)[0][1]
                  : errorResponse.data.message,
              detail:
                errorResponse && errorResponse.data.detail
                  ? errorResponse.data.detail
                  : errorResponse.detail,
              statusText: errorResponse && errorResponse.statusText,
            },
          });

        return Promise.reject(error);
      }
    );
  }, [dispatch]);

  const setApiHeaders = (token: string) => {
    api.HttpClient.defaults.headers.common["authorization"] = `Bearer ${token}`;
    api.HttpClient.defaults.headers.common["Content-Type"] = "application/json";
    // api.HttpClient.defaults.withCredentials = true;
  };

  return (
    <ApiContext.Provider
      value={{
        ...api,
        setApiHeaders,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

function useApiContext() {
  const context = React.useContext(ApiContext);
  if (context === undefined) {
    throw new Error("useApiContext must be used within a ApiProvider");
  }

  return context;
}

export { ApiProvider, useApiContext };
