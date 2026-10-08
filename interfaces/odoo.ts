import { OdooQuery } from "../tina/__generated__/types";

export interface IOdooProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: OdooQuery;
}
