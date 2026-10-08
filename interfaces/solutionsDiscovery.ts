import { SolutionDiscoveryQuery } from "../tina/__generated__/types";

export interface ISolutionDiscovery {
  query: string;
  variables: {
    relativePath: string;
  };
  data: SolutionDiscoveryQuery;
}
