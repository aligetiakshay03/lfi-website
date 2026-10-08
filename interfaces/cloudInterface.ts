import { CloudQuery } from "../tina/__generated__/types";

export interface ICloudProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: CloudQuery;
}