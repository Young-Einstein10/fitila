import React, { useState, useEffect, createContext, FC } from "react";
import { useApiContext } from "../Api";
import { IEcosystemStateProps } from "./types";

const EcosystemContext = createContext<IEcosystemStateProps | undefined>(
  undefined
);

const EcosystemProvider: FC = ({ children }) => {
  const [ecosystem, setEcosystem] = useState({
    isLoading: false,
    data: [],
  });

  const { ecosystem: api } = useApiContext();

  useEffect(() => {
    const getEcosystems = async () => {
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

    getEcosystems();
  }, [api]);

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
