import { FeaturedBlogsConnectionQuery, FeaturedBlogsQuery } from "../tina/__generated__/types";

export interface IFeaturedBlogs {
  query: string;
  variables: {
    relativePath: string;
  };
  data: FeaturedBlogsQuery;
}