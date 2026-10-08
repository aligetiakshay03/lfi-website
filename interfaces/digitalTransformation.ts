import { DigitalTransformationQuery } from "../tina/__generated__/types";

export interface IDigitalTransformation {
  query: string;
  variables: {
    relativePath: string;
  };
  data: DigitalTransformationQuery;
}
