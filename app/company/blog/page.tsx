import React from "react";
import databaseClient from "../../../tina/__generated__/databaseClient";
import BlogsPanel from "../../../components/Company/BlogsPanel";
import SEO from "../../../common/seo";

const Blog = async () => {
  const result = await databaseClient.queries.blogsSectionConnection();
  // const filters = await databaseClient.queries.categoriesConnection()
  const categories = await databaseClient.queries.keyWordsConnection();
  return (
    <>
      <SEO
        title="Blog | Linkfields Innovations"
        description="Blog | Linkfields Innovations"
      />

      <div>
        <BlogsPanel
          blogPosts={JSON.parse(JSON.stringify(result))}
          categories={JSON.parse(JSON.stringify(categories))}
        />
      </div>
    </>
  );
};

export default Blog;
