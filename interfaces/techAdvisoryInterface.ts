import { TechAdvisoryQuery } from "../tina/__generated__/types";

export interface ITechAdvisory {
  query: string;
  variables: {
    relativePath: string;
  };
  data: TechAdvisoryQuery;
}
