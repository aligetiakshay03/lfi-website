import { CategoriesConnectionQuery } from "../tina/__generated__/types";

export interface ICategoriesProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: CategoriesConnectionQuery;
}