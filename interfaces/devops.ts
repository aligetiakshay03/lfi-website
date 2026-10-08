import { DevOpsPageQuery } from "../tina/__generated__/types";

export interface IDevopsProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: DevOpsPageQuery;
}
