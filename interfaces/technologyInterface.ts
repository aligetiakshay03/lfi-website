import { TechnologyQuery } from "../tina/__generated__/types";

export interface ITechnologyProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: TechnologyQuery;
}