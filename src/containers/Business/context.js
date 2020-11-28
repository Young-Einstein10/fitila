import React, { useState } from "react";
import api from "../../config/api";
export const BusinessContext = React.createContext();

const BusinessProvider = ({ children }) => {
  const [state, setState] = useState({
    business_type: "",
    name: "",
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

  const addBusiness = async businessData => {
    const res = await api.business.addBusiness(businessData);

    if (res.status && res.status === 200) {
      console.log("DATA", res.data);
      const {
        data: { data },
      } = res;
    }
  };

  return (
    <BusinessContext.Provider value={{ state, setState, addBusiness }}>
      {children}
    </BusinessContext.Provider>
  );
};

export default BusinessProvider;
