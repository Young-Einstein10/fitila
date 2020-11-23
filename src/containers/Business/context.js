import React, { useState } from "react";
import api from "../../config/api";
export const BusinessContext = React.createContext();

const BusinessProvider = ({ children }) => {
  const [state, setState] = useState({
    business_type: "",
    name: "",
    ceo_name: "",
    address: "",
    state: "",
    ecosystem: "",
    sub_segment: "",
    business_sector: "",
    business_level: "",
    is_startup: "",
    num_supported_business: "",
    website: "",
    email: "",
    phone: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    cac_doc: "",
    gov_id: "",
    is_enterpreneur: false,
    is_ecosystem: false,
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
