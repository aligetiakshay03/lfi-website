import { KeyWordsConnectionQuery } from "../tina/__generated__/types";

export interface ICategoryGroupsProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: KeyWordsConnectionQuery;
}