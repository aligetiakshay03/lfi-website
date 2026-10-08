import { ProductDiscoveryQuery } from "../tina/__generated__/types";

export interface IProductDiscovery {
  query: string;
  variables: {
    relativePath: string;
  };
  data: ProductDiscoveryQuery;
}
