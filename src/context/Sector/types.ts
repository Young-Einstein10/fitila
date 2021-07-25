import { IOrganizationProps } from "../Organization/types";

interface ISectorProps {
  id: number;
  name: string;
  organization?: IOrganizationProps[];
  date_updated?: string;
  date_created?: string;
}


interface ISectorStateProps {
  isLoading: boolean;
  data: ISectorProps[];
  refetchSectors: () => void;
}

export type { ISectorProps, ISectorStateProps }