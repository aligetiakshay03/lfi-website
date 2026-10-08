import { TelecomQuery } from "../tina/__generated__/types";

export interface ITelecomProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: TelecomQuery;
}
