import { OilandgasQuery } from "../tina/__generated__/types";

export interface IOilandgasProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: OilandgasQuery;
}