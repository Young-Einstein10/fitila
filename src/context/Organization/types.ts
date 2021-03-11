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
  ceo_name?: string;
  description?: string;
}


interface IOrganizationStateProps {
  isLoading: boolean;
  data: IOrganizationProps[];
  refetchOrganizations: () => void;
  states: string[],
  sectors?: string[]
}

export type { IOrganizationProps, IOrganizationStateProps }