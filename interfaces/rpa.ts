import { RoboticProcessAutomationQuery } from "../tina/__generated__/types";

export interface IRpaProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: RoboticProcessAutomationQuery;
}
