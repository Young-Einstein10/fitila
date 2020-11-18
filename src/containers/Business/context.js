import React, { useState } from "react";
import api from "../../config/api";
export const BusinessContext = React.createContext();

const BusinessProvider = ({ children }) => {
  const [state, setState] = useState({
    business_type: "",
    ecosystem: "",
    name: "",
    town: "",
    state: "",
    local_gov: "",
    street_num: "",
    street_name: "",
    business_sector: "",
    num_supported_business: null,
    website: "",
    email: "",
    phone: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    cac_doc: null,
    cac_doc_url: null,
    gov_id: null,
    gov_id_url: null,
    is_entrepreneur: false,
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
