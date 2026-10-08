import { DataServicesQuery } from "../tina/__generated__/types";

export interface IDataServiesProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: DataServicesQuery;
}
