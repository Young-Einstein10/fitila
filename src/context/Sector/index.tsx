import React, { useState, useEffect, createContext, FC } from "react";
import { useMountedState } from "../../utils/hooks";
import { useApiContext } from "../Api";
import { ISectorProps, ISectorStateProps } from "./types";

const SectorContext = createContext<ISectorStateProps | undefined>(undefined);

const SectorProvider: FC = ({ children }) => {
  const [sectors, setSectors] = useState<{
    isLoading: boolean;
    data: ISectorProps[];
  }>({
    isLoading: false,
    data: [],
  });

  const { sector: api } = useApiContext();

  const isMounted = useMountedState();

  useEffect(() => {
    const getSectors = async () => {
      setSectors(prevSectors => ({
        ...prevSectors,
        isLoading: true,
      }));

      try {
        const res = await api.getSector();

        const data: ISectorProps[] = res.data.data;

        if (isMounted()) {
          setSectors(prevSectors => ({
            ...prevSectors,
            isLoading: false,
            data,
          }));
        }
      } catch (error) {
        if (isMounted()) {
          setSectors(prevSectors => ({
            ...prevSectors,
            isLoading: false,
          }));

          console.log(error);
        }
      }
    };

    getSectors();
  }, [api, isMounted]);

  const refetchSectors = async () => {
    setSectors(prevSectors => ({
      ...prevSectors,
      isLoading: true,
    }));

    try {
      const res = await api.getSector();

      const { data } = res.data;

      setSectors(prevSectors => ({
        ...prevSectors,
        isLoading: false,
        data,
      }));
    } catch (error) {
      setSectors(prevSectors => ({
        ...prevSectors,
        isLoading: false,
      }));

      console.log(error);
    }
  };

  return (
    <SectorContext.Provider value={{ ...sectors, refetchSectors }}>
      {children}
    </SectorContext.Provider>
  );
};

function useSectorContext() {
  const context = React.useContext(SectorContext);

  if (context === undefined) {
    throw new Error("useSectorContext must be used within a SectorProvider");
  }
  return context;
}

export { SectorProvider, useSectorContext };
