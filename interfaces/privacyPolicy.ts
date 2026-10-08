import { PrivacyPolicyQuery } from "../tina/__generated__/types";

export interface IPrivacyPolicy {
  query: string;
  variables: {
    relativePath: string;
  };
  data: PrivacyPolicyQuery;
}
