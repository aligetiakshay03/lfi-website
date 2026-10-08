import { QualityControlQuery } from "../tina/__generated__/types";

export interface IQualityControl {
  query: string;
  variables: {
    relativePath: string;
  };
  data: QualityControlQuery;
}
