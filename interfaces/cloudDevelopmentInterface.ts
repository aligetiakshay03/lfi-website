import { CloudDevelopmentQuery } from "../tina/__generated__/types";

export interface ICloudDevelopment {
  query: string;
  variables: {
    relativePath: string;
  };
  data: CloudDevelopmentQuery;
}