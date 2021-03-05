import React, { useState, useEffect, createContext, FC } from "react";
import { useApiContext } from "../Api";
import { IOrganizationStateProps } from "./types";

const OrganizationContext = createContext<IOrganizationStateProps | undefined>(
  undefined
);

const OrganizationProvider: FC = ({ children }) => {
  const [organization, setOrganization] = useState({
    isLoading: false,
    data: [],
  });

  const { organization: api } = useApiContext();

  useEffect(() => {
    const getAllOrganizations = async () => {
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

    getAllOrganizations();
  }, [api]);

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
