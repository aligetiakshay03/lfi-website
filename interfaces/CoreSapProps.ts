import { CoreSapExpertiseQuery } from "../tina/__generated__/types";

export interface ICoreSapExpertiseProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: CoreSapExpertiseQuery;
}