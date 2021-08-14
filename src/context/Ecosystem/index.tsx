import { AxiosResponse } from "axios";
import React, { useState, useEffect, createContext, FC } from "react";
import { useMountedState } from "../../utils/hooks";
import { useApiContext } from "../Api";
import {
  IEcosystemProps,
  IEcosystemStateProps,
  ISubclassProps,
  ISubclassResponse,
} from "./types";

const EcosystemContext = createContext<IEcosystemStateProps | undefined>(
  undefined
);

function restructureData(
  ecosystemData: IEcosystemProps[],
  subClassData: ISubclassProps[]
): IEcosystemProps[] {
  const result = ecosystemData.map(subEco => {
    const newSubEcosystem = subEco.sub_ecosystem.map(subEcosystem => {
      const subClass = subClassData.filter(
        ({ sub_ecosystem }) => subEcosystem.id === sub_ecosystem
      );

      return {
        ...subEcosystem,
        sub_class: subClass,
      };
    });

    return {
      ...subEco,
      sub_ecosystem: newSubEcosystem,
    };
  });

  return result;
}

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
    const getSubClasses = async (): Promise<AxiosResponse<
      ISubclassResponse
    >> => {
      const res = await api.getSubClass();
      return res;
    };

    const getEcosystems = async () => {
      setEcosystem(prevEcosystems => ({
        ...prevEcosystems,
        isLoading: true,
      }));

      try {
        const res = await api.getEcosystem();

        const ecosystemData: IEcosystemProps[] = res.data.data;

        const {
          data: { data: subClassData },
        } = await getSubClasses();

        const result = restructureData(ecosystemData, subClassData);

        if (isMounted()) {
          setEcosystem(prevEcosystems => ({
            ...prevEcosystems,
            isLoading: false,
            data: result,
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

  const getSubClasses = async (): Promise<AxiosResponse<ISubclassResponse>> => {
    const res = await api.getSubClass();
    return res;
  };

  const refetchEcosystems = async () => {
    setEcosystem(prevEcosystems => ({
      ...prevEcosystems,
      isLoading: true,
    }));

    try {
      const res = await api.getEcosystem();

      const { data: ecosystemData } = res.data;

      const {
        data: { data: subClassData },
      } = await getSubClasses();

      const result = restructureData(ecosystemData, subClassData);

      setEcosystem(prevEcosystems => ({
        ...prevEcosystems,
        isLoading: false,
        data: result,
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
