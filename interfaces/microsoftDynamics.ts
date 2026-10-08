import { MicrosoftDynamicsQuery } from "../tina/__generated__/types";

export interface IMicrosoftDynamicsProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: MicrosoftDynamicsQuery;
}
