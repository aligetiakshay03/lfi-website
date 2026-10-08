import { HomeAwardsAndRecognition } from "../tina/__generated__/types";

export interface IAwardsAndRecognition {
  query: string;
  variables: {
    relativePath: string;
  };
  data: HomeAwardsAndRecognition;
}
