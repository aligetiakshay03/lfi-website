import { CareersPageQuery } from "../tina/__generated__/types";

export interface ICareerPageProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: CareersPageQuery;
}