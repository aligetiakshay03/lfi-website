import { BlogsSectionQuery } from "../tina/__generated__/types";

export interface IBlogsSectionQuery {
  query: string;
  variables: {
    relativePath: string;
  };
  data: BlogsSectionQuery;
}