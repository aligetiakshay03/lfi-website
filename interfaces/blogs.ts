import { BlogsCollectionQuery } from "../tina/__generated__/types";

export interface IBlogCollection {
  query: string;
  variables: {
    relativePath: string;
  };
  data: BlogsCollectionQuery;
}
