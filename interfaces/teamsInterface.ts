import { TeamsQuery } from "../tina/__generated__/types";

export interface ITeamsProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: TeamsQuery;
}