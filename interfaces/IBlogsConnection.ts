import { ApplicationDevelopmentQuery, BlogsSectionConnection, BlogsSectionConnectionEdges, BlogsSectionConnectionQuery, BlogsSectionConnectionQueryVariables } from "../tina/__generated__/types";

export interface IBlogsSectionConnection {
  query: string;
  variables: {
    relativePath: string;
  };
  data: BlogsSectionConnectionQuery;
}