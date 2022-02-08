import { ISectorProps } from "../Sector/types";

export type IDetailProps = {
  id: number;
  name:  string;
  date_created: string;
  date_updated: string;
}

interface IOrganizationProps {
  ceo_image_url: string;
  company_logo_url: string;
  employee: string;
  funding?: number;
  funding_disbursed_for_support?: number;
  id: number;
  name: string;
  state: string;
  num_of_employees?: string;
  no_of_jobs?: number;
  ceo_name?: { name: string, avatar: string };
  description?: string;
  reason_for_decline?: string;

  sector: string;
  sector_name?: string;
  sector_detail?: ISectorProps
  
  // ======= ECOSYSTEM ========
  ecosystem_name?: string; 
  ecosystem?: number;
  ecosystem_detail?: IDetailProps[];
  sub_ecosystem?: number;
  sub_ecosystem_name?: string;
  sub_ecosystem_detail?: IDetailProps & { ecosystem_id: number }[];
  sub_ecosystem_sub_class?: string,
  sub_ecosystem_sub_class_name?: string,
  sub_ecosystem_sub_class_detail?: IDetailProps & { ecosystem_id: number, sub_ecosystem_id: number }[];
  // ======= ECOSYSTEM ========

  user?: any;
  ceo_gender?: string;
  address?: string;
  market_cap?: string;
  business_level?: BusinessLevelProps;
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
  responded?: boolean;
  date_created?: string;
  date_updated?: string
}


type BusinessLevelProps = "Micro" | "Small" | "Medium" | "Startup";

interface IOrganizationStateProps {
  isLoading: boolean;
  data: IOrganizationProps[];
  refetchOrganizations: () => void;
  updateOrganization: (updatedOrganization: IOrganizationProps) => void
  states: string[],
  sectors?: string[]
}

export type { IOrganizationProps, IOrganizationStateProps }