import { KubernetesServicesQuery } from "../tina/__generated__/types";

export interface IKubernetesProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: KubernetesServicesQuery;
}
