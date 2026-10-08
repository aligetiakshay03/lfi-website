import { ContactUsPageQuery, ContactusbannerQuery } from "../tina/__generated__/types";

export interface IContactUsProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: ContactUsPageQuery;
}

export interface IContactUsBanner {
  query: string;
  variables: {
    relativePath: string;
  };
  data: ContactusbannerQuery;
}