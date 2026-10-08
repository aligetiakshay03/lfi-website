import { BlogsSectionQuery, NewsSectionQuery } from "../tina/__generated__/types";

export interface INewsSectionQuery {
  query: string;
  variables: {
    relativePath: string;
  };
  data: NewsSectionQuery;
}