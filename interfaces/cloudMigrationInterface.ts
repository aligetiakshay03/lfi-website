import { CloudMigrationQuery } from "../tina/__generated__/types";

export interface ICloudMigrationProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: CloudMigrationQuery;
}
