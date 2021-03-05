import React, { useState, createContext, FC } from "react";
import { IBusinessProps, IBusinessStateProps } from "./types";

const BusinessContext = createContext<IBusinessProps | undefined>(undefined);

const BusinessProvider: FC = ({ children }) => {
  const [state, setState] = useState<IBusinessStateProps>({
    business_type: "",
    name: "",
    description: "",
    headquarters: "",
    ceo_name: "",
    ceo_image: null,
    company_logo: null,
    sub_ecosystem: "",
    sub_ecosystem_sub_class: null,
    address: "",
    state: "",
    ecosystem: "",
    sub_segment: "",
    sector: "",
    business_level: "",
    is_startup: "",
    num_supported_business: "",
    website: "",
    num_of_employees: "",
    funding: "",
    company_valuation: "",
    email: "",
    phone: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    cac_doc: "",
    is_enterpreneur: false,
    is_ecosystem: false,
    is_active: true,
    user: null,
  });

  return (
    <BusinessContext.Provider value={{ state, setState }}>
      {children}
    </BusinessContext.Provider>
  );
};

function useBusinessContext() {
  const context = React.useContext(BusinessContext);

  if (context === undefined) {
    throw new Error(
      "useBusinessContext must be used within a BusinessProvider"
    );
  }
  return context;
}

export { BusinessProvider, useBusinessContext };
