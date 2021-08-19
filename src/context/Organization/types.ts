interface IOrganizationProps {
  ceo_image_url: string;
  company_logo_url: string;
  employee: string;
  funding?: number;
  funding_disbursed_for_support?: number;
  id: number;
  name: string;
  sector: string;
  state: string;
  num_of_employees?: string;
  ceo_name?: { name: string, avatar: string };
  description?: string;
  ecosystem_name?: string;
  sub_ecosystem_name?: string;
  sub_ecosystem_sub_class?: string,
  sub_ecosystem_sub_class_name?: string,
  user?: any;
  ceo_gender?: string;
  address?: string;
  ecosystem?: number;
  sub_ecosystem?: number;
  sector_name?: string;
  market_cap?: string;
  business_level?: string;
  company_valuation?: string;
  is_startup?: boolean
  num_supported_business?: number;
  ceo_image?: any;
  company_logo?: any;
  head_quarters?: string;
  facebook?: string;
  instagram?: string;
  linkedIn?: string;
  twitter?; string;
  cac_doc?: string,
  phone?: string;
  website?: string;
  is_entrepreneur?: boolean;
  is_ecosystem?: boolean;
  is_active?: boolean;
  is_approved?: boolean;
  is_declined?: boolean;
  date_created?: string;
  date_updated?: string
}


interface IOrganizationStateProps {
  isLoading: boolean;
  data: IOrganizationProps[];
  refetchOrganizations: () => void;
  states: string[],
  sectors?: string[]
}

export type { IOrganizationProps, IOrganizationStateProps }