import { CookiesPolicyQuery } from "../tina/__generated__/types";

export interface ICookiesPolicy {
  query: string;
  variables: {
    relativePath: string;
  };
  data: CookiesPolicyQuery;
}
