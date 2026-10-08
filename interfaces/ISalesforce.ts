import { SalesforceQuery } from "../tina/__generated__/types";

export interface ISalesforceProps {
    query: string;
    variables: {
        relativePath: string;
    };
    data: SalesforceQuery;
}
