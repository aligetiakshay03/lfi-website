import { ConsultingQuery } from "../tina/__generated__/types";

export interface IConsultingComponent {
  query: string;
  variables: {
    relativePath: string;
  };
  data: ConsultingQuery;
}
