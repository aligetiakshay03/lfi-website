import { ApplicationDevelopmentQuery } from "../tina/__generated__/types";

export interface IApplicationDevelopment {
  query: string;
  variables: {
    relativePath: string;
  };
  data: ApplicationDevelopmentQuery;
}
