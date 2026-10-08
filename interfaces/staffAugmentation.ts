import { StaffAugmentationQuery } from "../tina/__generated__/types";

export interface IStaffAugmentation {
  query: string;
  variables: {
    relativePath: string;
  };
  data: StaffAugmentationQuery;
}
