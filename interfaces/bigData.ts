import { BigDataQuery } from "../tina/__generated__/types";

export interface IBigData {
  query: string;
  variables: {
    relativePath: string;
  };
  data: BigDataQuery;
}
