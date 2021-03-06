interface IOrganizationProps {
  ceo_image_url: string;
  company_logo_url: string;
  employee: string;
  funding: string;
  id: number;
  name: string;
  sector: string;
  state: string;
}


interface IOrganizationStateProps {
  isLoading: boolean;
  data: IOrganizationProps[];
  refetchOrganizations: () => void;
  states: string[],
  sectors?: string[]
}

export type { IOrganizationProps, IOrganizationStateProps }