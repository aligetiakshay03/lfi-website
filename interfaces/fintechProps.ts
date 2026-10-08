import { FintechQuery } from "../tina/__generated__/types";

export interface IFintechProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: FintechQuery;
}