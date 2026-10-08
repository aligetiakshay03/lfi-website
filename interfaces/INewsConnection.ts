import { NewsSectionConnectionQuery } from "../tina/__generated__/types";

export interface INewsConnection {
  query: string;
  variables: {
    relativePath: string;
  };
  data: NewsSectionConnectionQuery;
}