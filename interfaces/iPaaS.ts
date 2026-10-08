import { IPaaSQuery } from "../tina/__generated__/types";

export interface IIPaaS {
  query: string;
  variables: {
    relativePath: string;
  };
  data: IPaaSQuery;
}
