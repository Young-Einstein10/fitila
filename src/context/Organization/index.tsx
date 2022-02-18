import React, { useState, useEffect, createContext, FC } from "react";
import { useApiContext } from "../Api";
import { IOrganizationProps, IOrganizationStateProps } from "./types";
import { useMountedState } from "../../utils/hooks";
import { capitalize } from "../../utils/helpers";

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
      "ICT",
      "Government",
      "Finance",
      "Others",
    ],
    states: ["Lagos", "Ogun", "Abuja", "Kano", "Kaduna"],
  });

  const { organization: api } = useApiContext();

  const isMounted = useMountedState();

  useEffect(() => {
    const getAllOrganizations = async () => {
      setOrganization(prevOrganizations => ({
        ...prevOrganizations,
        isLoading: true,
      }));

      try {
        const res = await api.getOrganization();

        const { data } = res.data;

        const states = [
          ...new Set<any>(data.map(org => capitalize(org.state))),
        ].filter(a => a);

        if (isMounted()) {
          setOrganization(prevOrganizations => ({
            ...prevOrganizations,
            isLoading: false,
            data: [...new Set(data)],
            states,
          }));
        }
      } catch (error) {
        if (isMounted()) {
          setOrganization(prevOrganizations => ({
            ...prevOrganizations,
            isLoading: false,
          }));
        }
        console.log(error);
      }
    };

    getAllOrganizations();
  }, [api, isMounted]);

  const refetchOrganizations = async () => {
    setOrganization(prevOrganizations => ({
      ...prevOrganizations,
      isLoading: true,
    }));

    try {
      const res = await api.getOrganization();

      const { data } = res.data;

      const states = [
        ...new Set<any>(data.map(org => capitalize(org.state))),
      ].filter(a => a);

      setOrganization(prevOrganizations => ({
        ...prevOrganizations,
        isLoading: false,
        data,
        states,
      }));
    } catch (error) {
      setOrganization(prevOrganizations => ({
        ...prevOrganizations,
        isLoading: false,
      }));

      console.log(error);
    }
  };

  const updateOrganization = (updatedOrganization: IOrganizationProps) => {
    // setOrganization(prevOrg => ({
    //   ...prevOrg,
    //   data: [...prevOrg.data, updatedOrganization],
    // }));

    setOrganization({
      ...organization,
      data: [
        ...organization.data.filter(org => org.id !== updatedOrganization.id),
        updatedOrganization,
      ],
    });
  };

  return (
    <OrganizationContext.Provider
      value={{ ...organization, updateOrganization, refetchOrganizations }}
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
