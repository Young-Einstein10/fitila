import React, { useState, useEffect, createContext, FC } from "react";
import { useApiContext } from "../Api";
import { IOrganizationProps, IOrganizationStateProps } from "./types";
import { useMountedState } from "../../utils/hooks";
import { capitalize } from "../../utils/helpers";

const testData = [
  {
    id: 1897,
    user: null,
    name: "Central Bank of Nigeria (CBN)",
    company_logo: null,
    company_logo_url: null,
    num_of_employees: null,
    state: "Abuja",
    address: "Plot 33, Abubakar Tafawa Balewa Way",
    ecosystem: 37,
    ecosystem_name: "Policy and Regulation",
    sub_ecosystem: 150,
    sub_ecosystem_name: "Government",
    sub_ecosystem_sub_class: "",
    sector: 58,
    sector_name: "Public Sector",
    business_level: "Medium",
    funding: null,
    company_valuation: null,
    is_startup: null,
    num_supported_business: null,
    ceo_name: "Godwin Emefiele",
    ceo_image: null,
    ceo_gender: "Male",
    ceo_image_url: null,
    website: "cbn.gov.ng",
    email: "contactcbn@cbn.gov.ng",
    phone: "+234 700 225 5226",
    description: null,
    head_quarters: null,
    facebook: "ttps://web.facebook.com/cenbankng/",
    instagram: "",
    linkedin: "linkedin.com/in/central-bank-of-nigeria-68611917",
    twitter: "twitter.com/cenbank",
    url_1: null,
    url_2: null,
    url_3: null,
    cac_doc: null,
    is_entrepreneur: true,
    is_ecosystem: false,
    date_created: "2021-04-08T12:47:39.607185Z",
    date_updated: "2021-04-08T12:47:39.607234Z",
  },
  {
    id: 1898,
    user: null,
    name: "Corporate Affairs Commission (CAC)",
    company_logo: null,
    company_logo_url: null,
    num_of_employees: null,
    state: "Abuja",
    address: "Plot 420, Tigris Crescent, Off Aguiyi Ironsi Street",
    ecosystem: 37,
    ecosystem_name: "Policy and Regulation",
    sub_ecosystem: 150,
    sub_ecosystem_name: "Government",
    sub_ecosystem_sub_class: "",
    sector: 58,
    sector_name: "Public Sector",
    business_level: "Medium",
    funding: null,
    company_valuation: null,
    is_startup: null,
    num_supported_business: null,
    ceo_name: "ALHAJI GARBA ABUBAKAR",
    ceo_image: null,
    ceo_gender: "Male",
    ceo_image_url: null,
    website: "cac.gov.ng",
    email: "cservice@cac.gov.ng",
    phone: "234 809 552 1924",
    description: null,
    head_quarters: null,
    facebook: "https://web.facebook.com/cacnigeria1",
    instagram: "",
    linkedin: "https://www.linkedin.com/company/corporate-affairs-commission/",
    twitter: "https://twitter.com/cacnigeria",
    url_1: null,
    url_2: null,
    url_3: null,
    cac_doc: null,
    is_entrepreneur: true,
    is_ecosystem: false,
    date_created: "2021-04-08T12:47:39.638071Z",
    date_updated: "2021-04-08T12:47:39.638122Z",
  },
  {
    id: 1899,
    user: null,
    name: "Enabling Business Environment Secretariat (EBES)",
    company_logo: null,
    company_logo_url: null,
    num_of_employees: null,
    state: "Abuja",
    address: "Plot No.1181, Aguiyi Ironsi Street",
    ecosystem: 37,
    ecosystem_name: "Policy and Regulation",
    sub_ecosystem: 150,
    sub_ecosystem_name: "Government",
    sub_ecosystem_sub_class: "",
    sector: 58,
    sector_name: "Public Sector",
    business_level: "Medium",
    funding: null,
    company_valuation: null,
    is_startup: null,
    num_supported_business: null,
    ceo_name: "Dr. Jumoke Oduwole",
    ceo_image: null,
    ceo_gender: "Female",
    ceo_image_url: null,
    website: "https://easeofdoingbusinessnigeria.com",
    email: "info@ebes.gov.ng",
    phone: "T +234 909 323 1541",
    description: null,
    head_quarters: null,
    facebook: "http://facebook.com/EBESNigeria",
    instagram: "http://instagram.com/EBESNigeria",
    linkedin:
      "https://www.linkedin.com/company/pebec-ebes-the-presidential-enabling-business-environment-council-nigeria/",
    twitter: "https://twitter.com/EBESNigeria",
    url_1: null,
    url_2: null,
    url_3: null,
    cac_doc: null,
    is_entrepreneur: true,
    is_ecosystem: false,
    date_created: "2021-04-08T12:47:39.678099Z",
    date_updated: "2021-04-08T12:47:39.678145Z",
  },
];

const OrganizationContext = createContext<IOrganizationStateProps | undefined>(
  undefined
);

const OrganizationProvider: FC = ({ children }) => {
  const [organization, setOrganization] = useState<any>({
    isLoading: false,
    data: [],
    sectors: [
      "Health",
      "Agriculture",
      "Creatives",
      "Education",
      "ICT",
      "Government",
      "Finance",
      "Others",
    ],
    states: ["Lagos", "Ogun", "Abuja", "Kano", "Kaduna"],
  });

  const { organization: api } = useApiContext();

  const isMounted = useMountedState();

  useEffect(() => {
    const getAllOrganizations = async () => {
      setOrganization(prevOrganizations => ({
        ...prevOrganizations,
        isLoading: true,
      }));

      try {
        const res = await api.getOrganization();

        const { data } = res.data;

        const states = [
          ...new Set<any>(data.map(org => capitalize(org.state))),
        ].filter(a => a);

        if (isMounted()) {
          setOrganization(prevOrganizations => ({
            ...prevOrganizations,
            isLoading: false,
            data: [...new Set(data)],
            // data: testData,
            states,
          }));
        }
      } catch (error) {
        if (isMounted()) {
          setOrganization(prevOrganizations => ({
            ...prevOrganizations,
            isLoading: false,
          }));
        }
        console.log(error);
      }
    };

    getAllOrganizations();
  }, [api, isMounted]);

  const refetchOrganizations = async () => {
    setOrganization(prevOrganizations => ({
      ...prevOrganizations,
      isLoading: true,
    }));

    try {
      const res = await api.getOrganization();

      const { data } = res.data;

      const states = [
        ...new Set<any>(data.map(org => capitalize(org.state))),
      ].filter(a => a);

      setOrganization(prevOrganizations => ({
        ...prevOrganizations,
        isLoading: false,
        data,
        states,
      }));
    } catch (error) {
      setOrganization(prevOrganizations => ({
        ...prevOrganizations,
        isLoading: false,
      }));

      console.log(error);
    }
  };

  const updateOrganization = (updatedOrganization: IOrganizationProps) => {
    // setOrganization(prevOrg => ({
    //   ...prevOrg,
    //   data: [...prevOrg.data, updatedOrganization],
    // }));

    setOrganization({
      ...organization,
      data: [
        ...organization.data.filter(org => org.id !== updatedOrganization.id),
        updatedOrganization,
      ],
    });
  };

  return (
    <OrganizationContext.Provider
      value={{ ...organization, updateOrganization, refetchOrganizations }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

function useOrganizationContext() {
  const context = React.useContext(OrganizationContext);

  if (context === undefined) {
    throw new Error(
      "useOrganizationContext must be used within a OrganizationProvider"
    );
  }
  return context;
}

export { OrganizationProvider, useOrganizationContext };
