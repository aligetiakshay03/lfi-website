import { UiuxQuery } from "../tina/__generated__/types";

export interface IUiUx {
  query: string;
  variables: {
    relativePath: string;
  };
  data: UiuxQuery;
}
