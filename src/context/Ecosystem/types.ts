import { IOrganizationProps } from "../Organization/types";


type ISubclassResponse = {
  status: boolean,
  message: string,
  data: ISubclassProps[]
}

interface ISubclassProps {
  id?: number;
  name?: string;
  organizations?: IOrganizationProps[];
  is_active?: boolean;
  date_created?: string;
  date_updated?: string;
  sub_ecosystem?: number;
  ecosystem?: number;
}

interface ISubEcosystem {
  id: number;
  name: string;
  sub_class: ISubclassProps[];
  organizations?: IOrganizationProps[]
  ecosystem?: number;
  date_created?: string;
  date_updated?: string;
}

interface IEcosystemProps {
  date_created: string;
  date_updated: string;
  id: number;
  name: string;
  num_of_sectors: number;
  num_of_states: number;
  num_of_organization: number;
  sub_ecosystem: ISubEcosystem[]
}


interface IEcosystemStateProps {
  isLoading: boolean;
  data: IEcosystemProps[],
  refetchEcosystems: () => void;
}

export type { IEcosystemProps, ISubEcosystem, ISubclassProps, ISubclassResponse, IEcosystemStateProps }