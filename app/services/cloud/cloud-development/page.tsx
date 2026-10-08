"use server";
import React from "react";
import CloudDevelopmentPanel from "../../../../components/services/cloud/cloudDevelopment";
import databaseClient from "../../../../tina/__generated__/databaseClient";
import SEO from "../../../../common/seo";

async function CloudDevelopment() {
  const cloudDevData = await databaseClient.queries.cloudDevelopment({
    relativePath: "CloudDevelopment.json",
  });

  const blogsPosts = await databaseClient.queries.blogsCollection({
    relativePath: "blogs-section.json",
  });
  const featuredBlogs = await databaseClient.queries.featuredBlogs({
    relativePath: "FeaturedBlogs.json",
  });

  const contactUsBanner = await databaseClient.queries.contactusbanner({
    relativePath: "ContactBannerIcons.json",
  });

  return (
    <>
      <SEO
        title="Cloud Development | Linkfields Innovations"
        description="Cloud Development | Linkfields Innovations"
      />
      <meta name="robots" content="index, follow" />
      <div>
        <CloudDevelopmentPanel
          data={JSON.parse(JSON.stringify(cloudDevData))}
          blogPosts={JSON.parse(JSON.stringify(blogsPosts))}
          featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
          contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
        />
      </div>
    </>
  );
}

export default CloudDevelopment;
