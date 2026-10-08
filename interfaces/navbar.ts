import { NavbarQuery, NavbarQueryVariables } from "../tina/__generated__/types";

export interface INavbar {
    query: string;
    variables: {
        relativePath: string;
    };
    data: NavbarQuery
}