interface IOrganizationProps {
  ceo_image_url: string;
  company_logo_url: string;
  employee: string;
  funding: string;
  id: number;
  name: string;
  sector: string;
  state: string;
  num_of_employees?: string;
  ceo_name?: { name: string, avatar: string };
  description?: string;
  ecosystem_name?: string;
  sub_ecosystem_name?: string;
  user?: any;
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
  head_quarters?: string;
  facebook?: string;
  instagram?: string;
  linkedIn?: string;
  twitter?; string;
  is_entrepreneur?: boolean;
  is_ecosystem?: boolean;
  is_active?: boolean;
  is_approved?: boolean;
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