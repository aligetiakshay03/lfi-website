import { SapQuery } from "../tina/__generated__/types";

export interface ISapProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: SapQuery;
}
