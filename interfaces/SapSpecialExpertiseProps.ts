import { SapSpecialExpertiseQuery } from "../tina/__generated__/types";

export interface ISapSpecialExpertiseProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: SapSpecialExpertiseQuery;
}