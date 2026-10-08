import { PersistentlyInnovativeQuery } from "../tina/__generated__/types";

export interface IPersistentlyInnovative {
  query: string;
  variables: {
    relativePath: string;
  };
  data: PersistentlyInnovativeQuery;
}
