import { BankingQuery } from "../tina/__generated__/types";

export interface IBankingProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: BankingQuery;
}
