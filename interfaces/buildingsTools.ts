import { BuildingsToolsQuery } from "../tina/__generated__/types";

export interface IBuildingsToolsProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: BuildingsToolsQuery;
}
