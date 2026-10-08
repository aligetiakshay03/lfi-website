import { AiMlQuery } from "../tina/__generated__/types";

export interface IAIML {
  query: string;
  variables: {
    relativePath: string;
  };
  data: AiMlQuery;
}
