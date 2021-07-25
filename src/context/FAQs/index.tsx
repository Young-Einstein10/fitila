import React, { useState, useEffect, createContext, FC } from "react";
import { useMountedState } from "../../utils/hooks";
import { useApiContext } from "../Api";

interface IFAQStateProps {
  isLoading: boolean;
  data: IFAQProps[];
  refetchFAQs: () => void;
}

interface IFAQProps {
  id: string;
  question: string;
  answer: string;
  is_active: boolean;
  date_added: string;
}

const FAQContext = createContext<IFAQStateProps | undefined>(undefined);

const FAQProvider: FC = ({ children }) => {
  const [faqs, setFAQs] = useState<{
    isLoading: boolean;
    data: IFAQProps[];
  }>({
    isLoading: false,
    data: [],
  });

  const api = useApiContext();

  const isMounted = useMountedState();

  useEffect(() => {
    const getFAQs = async () => {
      setFAQs(prevFAQs => ({
        ...prevFAQs,
        isLoading: true,
      }));

      try {
        const res = await api.faq.getAllFaq();

        if (res.status === 200) {
          const data: IFAQProps[] = res.data.data;

          if (isMounted()) {
            setFAQs(prevFAQs => ({
              ...prevFAQs,
              isLoading: false,
              data,
            }));
          }
        }
      } catch (error) {
        if (isMounted()) {
          setFAQs(prevFAQs => ({
            ...prevFAQs,
            isLoading: false,
          }));

          console.log(error);
        }
      }
    };

    getFAQs();
  }, [api, isMounted]);

  const refetchFAQs = async () => {
    setFAQs(prevFAQs => ({
      ...prevFAQs,
      isLoading: true,
    }));

    try {
      const res = await api.faq.getAllFaq();

      const { data } = res.data;

      setFAQs(prevFAQs => ({
        ...prevFAQs,
        isLoading: false,
        data,
      }));
    } catch (error) {
      setFAQs(prevFAQs => ({
        ...prevFAQs,
        isLoading: false,
      }));

      console.log(error);
    }
  };

  return (
    <FAQContext.Provider value={{ ...faqs, refetchFAQs }}>
      {children}
    </FAQContext.Provider>
  );
};

function useFAQContext() {
  const context = React.useContext(FAQContext);

  if (context === undefined) {
    throw new Error("useFAQContext must be used within a FAQProvider");
  }
  return context;
}

export { FAQProvider, useFAQContext };
