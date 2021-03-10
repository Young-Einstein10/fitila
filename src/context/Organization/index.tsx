import React, { useState, useEffect, createContext, FC, useRef } from "react";
import Axios from "axios";
import { useApiContext } from "../Api";
import { IOrganizationProps, IOrganizationStateProps } from "./types";
import { useMountedState } from "../../utils/hooks";

const OrganizationContext = createContext<IOrganizationStateProps | undefined>(
  undefined
);

const OrganizationProvider: FC = ({ children }) => {
  const [organization, setOrganization] = useState({
    isLoading: false,
    data: [],
    sectors: [
      "Health",
      "Agriculture",
      "Creatives",
      "Education",
      "Manufacturers",
      "ICT",
      "Finance",
    ],
    states: ["Lagos", "Ogun", "Abuja", "Kano", "Kaduna"],
  });

  const { organization: api } = useApiContext();

  const isMounted = useMountedState();

  const ecosystemData = useRef<any[]>();

  useEffect(() => {
    const cancelTokenSource = Axios.CancelToken;
    const source = cancelTokenSource.source();

    const getAllOrganizations = async () => {
      setOrganization(prevOrganizations => ({
        ...prevOrganizations,
        isLoading: true,
      }));

      try {
        if (
          ecosystemData.current &&
          ecosystemData.current.length
          // ecosystemData.current.data.length
        ) {
          if (isMounted()) {
            setOrganization(prevOrganizations => ({
              ...prevOrganizations,
              isLoading: false,
              data: ecosystemData.current,
            }));
          }
        } else {
          const res = await api.getOrganization({
            cancelToken: source.token,
          });

          const { data } = res.data;

          if (isMounted()) {
            setOrganization(prevOrganizations => ({
              ...prevOrganizations,
              isLoading: false,
              data,
            }));

            ecosystemData.current = data;
          }
        }
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        }
        // handle error
        if (isMounted()) {
          setOrganization(prevOrganizations => ({
            ...prevOrganizations,
            isLoading: false,
          }));

          console.log(error);
        }
      }
    };

    // if (organization.data.length === 0) {
    //   getAllOrganizations();
    // }
    getAllOrganizations();

    return () => {
      // cancel the request (the message parameter is optional)
      source.cancel("Operation canceled by the user.");
    };
  }, [api, isMounted]);

  const refetchOrganizations = async () => {
    setOrganization(prevOrganizations => ({
      ...prevOrganizations,
      isLoading: true,
    }));

    try {
      const res = await api.getOrganization();

      const { data } = res.data;

      setOrganization(prevOrganizations => ({
        ...prevOrganizations,
        isLoading: false,
        data,
      }));
    } catch (error) {
      setOrganization(prevOrganizations => ({
        ...prevOrganizations,
        isLoading: false,
      }));

      console.log(error);
    }
  };

  return (
    <OrganizationContext.Provider
      value={{ ...organization, refetchOrganizations }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

function useOrganizationContext() {
  const context = React.useContext(OrganizationContext);

  if (context === undefined) {
    throw new Error(
      "useOrganizationContext must be used within a OrganizationProvider"
    );
  }
  return context;
}

export { OrganizationProvider, useOrganizationContext };
