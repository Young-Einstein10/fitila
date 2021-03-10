import { IOrganizationProps } from "../Organization/types";


interface ISubclassProps {
  id: number;
  name: string;
  organizations: IOrganizationProps[]
}

interface ISubEcosystem {
  id: number;
  name: string;
  sub_class: ISubclassProps[]
}

interface IEcosystemProps {
  date_created: string;
  date_updated: string;
  id: number;
  name: string;
  sub_ecosystem: ISubEcosystem[]
}


interface IEcosystemStateProps {
  isLoading: boolean;
  data: IEcosystemProps[],
  refetchEcosystems: () => void;
}

export type { IEcosystemProps, IEcosystemStateProps }