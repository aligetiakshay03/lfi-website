import { ManagedTeamQuery } from "../tina/__generated__/types";

export interface IManagedTeam {
  query: string;
  variables: {
    relativePath: string;
  };
  data: ManagedTeamQuery;
}
