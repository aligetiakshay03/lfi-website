import { Sap_HanaQuery } from "../tina/__generated__/types";

export interface ISapHanaProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: Sap_HanaQuery;
}
