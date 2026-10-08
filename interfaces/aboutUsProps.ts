import { AboutUsQuery } from "../tina/__generated__/types";

export interface IAboutUsProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: AboutUsQuery;
}