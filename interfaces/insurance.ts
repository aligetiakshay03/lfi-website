import { InsuranceQuery } from "../tina/__generated__/types";

export interface IInsuranceProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: InsuranceQuery;
}
