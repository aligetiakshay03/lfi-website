import { MiningQuery } from "../tina/__generated__/types";

export interface IMiningProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: MiningQuery;
}