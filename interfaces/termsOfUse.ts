import { TermsOfUseQuery } from "../tina/__generated__/types";

export interface ITermsOfUse {
  query: string;
  variables: {
    relativePath: string;
  };
  data: TermsOfUseQuery;
}
