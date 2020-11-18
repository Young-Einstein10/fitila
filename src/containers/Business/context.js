import React, { useState } from "react";
export const BusinessContext = React.createContext();

const BusinessProvider = ({ children }) => {
  const [state, setState] = useState({
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
    is_active: true,
    user: null,
  });

  return (
    <BusinessContext.Provider value={{ state, setState }}>
      {children}
    </BusinessContext.Provider>
  );
};

export default BusinessProvider;
