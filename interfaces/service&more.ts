import { ServiceAndMoreQuery } from "../tina/__generated__/types";
export interface IServiceAndMoreProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: ServiceAndMoreQuery;
}
