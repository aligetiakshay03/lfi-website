import { BlogsSectionQuery, OurApproachQuery } from "../tina/__generated__/types";

export interface IOurApproachProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: OurApproachQuery;
}