import { CloudConsultingPageQuery, EngineeringQuery } from "../tina/__generated__/types";

export interface ICloudConsulting {
  query: string;
  variables: {
    relativePath: string;
  };
  data: CloudConsultingPageQuery;
}