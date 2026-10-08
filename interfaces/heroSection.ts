import { HomeQuery, Navbar } from "../tina/__generated__/types";

export interface IHomePage {
  query: string;
  variables: {
    relativePath: string;
  };
  data: HomeQuery;
}

export interface InavBar {
  query: string;
  variables: {
    relativePath: string;
  };
  data: Navbar;
}
