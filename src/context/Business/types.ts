interface IBusinessStateProps {
  business_type: string;
  name: string;
  description: string;
  headquarters: string;
  ceo_name: string;
  ceo_image: null;
  company_logo: null;
  sub_ecosystem: string;
  sub_ecosystem_sub_class: null;
  address: string;
  state: string;
  ecosystem: string;
  sub_segment: string;
  sector: string;
  business_level: string;
  is_startup: string;
  num_supported_business: string;
  website: string;
  num_of_employees: string;
  funding: string;
  company_valuation: string;
  email: string;
  phone: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  cac_doc: string;
  is_enterpreneur: boolean;
  is_ecosystem: boolean;
  is_active: boolean;
  user: null;
}

interface IBusinessProps {
  state: IBusinessStateProps;
  setState: React.Dispatch<React.SetStateAction<IBusinessStateProps>>
}

export type { IBusinessProps, IBusinessStateProps }