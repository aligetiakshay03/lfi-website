import { ManufacturingQuery } from "../tina/__generated__/types";

export interface IManufacturingProps {
    query: string;
    variables: {
        relativePath: string;
    };
    data: ManufacturingQuery;
}
