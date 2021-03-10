import React, { useState, useEffect, createContext, FC } from "react";
import { useMountedState } from "../../utils/hooks";
import { useApiContext } from "../Api";
import { IEcosystemProps, IEcosystemStateProps } from "./types";

const EcosystemContext = createContext<IEcosystemStateProps | undefined>(
  undefined
);

const EcosystemProvider: FC = ({ children }) => {
  const [ecosystem, setEcosystem] = useState<{
    isLoading: boolean;
    data: IEcosystemProps[];
  }>({
    isLoading: false,
    data: [],
  });

  const { ecosystem: api } = useApiContext();

  const isMounted = useMountedState();

  useEffect(() => {
    const getEcosystems = async () => {
      setEcosystem(prevEcosystems => ({
        ...prevEcosystems,
        isLoading: true,
      }));

      try {
        const res = await api.getEcosystem();

        const { data } = res.data;

        if (isMounted()) {
          let RESOURCES = data
            .map(ecosystem => ecosystem)
            .find(ecosystem => ecosystem.name === "Resources");

          RESOURCES = RESOURCES.sub_ecosystem.map(subeco => {
            let result = [];

            return {
              ...subeco,
              sub_class: result,
            };
          });

          const formattedData = data
            .filter(ecosystem => ecosystem.name !== "Resources")
            .map(ecosystem => {
              let sub_eco = ecosystem.sub_ecosystem.map(subeco => {
                if (subeco.name === "Business Advisory") {
                  subeco.sub_class = [
                    {
                      id: 1,
                      name: "Mentoring",
                      organizations: subeco.organizations,
                    },
                    {
                      id: 2,
                      name: "Legal",
                      organizations: subeco.organizations,
                    },
                    {
                      id: 3,
                      name: "Tax",
                      organizations: subeco.organizations,
                    },
                    {
                      id: 4,
                      name: "HR",
                      organizations: subeco.organizations,
                    },
                    {
                      id: 5,
                      name: "Book-Keeping",
                      organizations: subeco.organizations,
                    },
                  ];
                } else {
                  subeco.sub_class = [];
                }

                return {
                  ...subeco,
                };
              });

              return {
                ...ecosystem,
                name:
                  ecosystem.name === "Businesses"
                    ? "MSMEs & Startups"
                    : ecosystem.name,
                sub_ecosystem: sub_eco,
              };
            });

          setEcosystem(prevEcosystems => ({
            ...prevEcosystems,
            isLoading: false,
            data: formattedData,
          }));
        }
      } catch (error) {
        if (isMounted()) {
          setEcosystem(prevEcosystems => ({
            ...prevEcosystems,
            isLoading: false,
          }));

          console.log(error);
        }
      }
    };

    getEcosystems();
  }, [api, isMounted]);

  const refetchEcosystems = async () => {
    setEcosystem(prevEcosystems => ({
      ...prevEcosystems,
      isLoading: true,
    }));

    try {
      const res = await api.getEcosystem();

      const { data } = res.data;

      setEcosystem(prevEcosystems => ({
        ...prevEcosystems,
        isLoading: false,
        data,
      }));
    } catch (error) {
      setEcosystem(prevEcosystems => ({
        ...prevEcosystems,
        isLoading: false,
      }));

      console.log(error);
    }
  };

  return (
    <EcosystemContext.Provider value={{ ...ecosystem, refetchEcosystems }}>
      {children}
    </EcosystemContext.Provider>
  );
};

function useEcosystemContext() {
  const context = React.useContext(EcosystemContext);

  if (context === undefined) {
    throw new Error(
      "useEcosystemContext must be used within a EcosystemProvider"
    );
  }
  return context;
}

export { EcosystemProvider, useEcosystemContext };
