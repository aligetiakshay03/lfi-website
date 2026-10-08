import { EngineeringQuery } from "../tina/__generated__/types";

export interface IEngineeringComponent {
  query: string;
  variables: {
    relativePath: string;
  };
  data: EngineeringQuery;
}
