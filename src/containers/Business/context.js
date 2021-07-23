import React, { useState } from "react";
import { useApiContext } from "../../context";
export const BusinessContext = React.createContext();

const BusinessProvider = ({ children }) => {
  const [state, setState] = useState({
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

  const { organization } = useApiContext();

  const addBusiness = async businessData => {
    const res = await organization.addBusiness(businessData);

    if (res.status && res.status === 200) {
      console.log("DATA", res.data);
    }
  };

  return (
    <BusinessContext.Provider value={{ state, setState, addBusiness }}>
      {children}
    </BusinessContext.Provider>
  );
};

export default BusinessProvider;
