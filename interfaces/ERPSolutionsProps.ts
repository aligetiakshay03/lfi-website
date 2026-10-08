import { ErpSolutionsQuery } from "../tina/__generated__/types";

export interface IERPSolutionsProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: ErpSolutionsQuery;
}
