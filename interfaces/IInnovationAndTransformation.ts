import { InnovationAndTransformationQuery } from "../tina/__generated__/types";

export interface IInnovationAndTransformation {
    query: string;
    variables: {
        relativePath: string;
    };
    data: InnovationAndTransformationQuery;
}
