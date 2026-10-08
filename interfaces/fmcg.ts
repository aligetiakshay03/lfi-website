import { FmcgQuery } from "../tina/__generated__/types";

export interface IFMCGProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: FmcgQuery;
}
