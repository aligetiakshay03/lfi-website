import { FooterQuery } from "../tina/__generated__/types";

export interface IFooter {
  query: string;
  variables: {
    relativePath: string;
  };
  data: FooterQuery;
}
