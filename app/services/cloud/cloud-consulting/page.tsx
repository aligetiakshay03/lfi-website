"use server";
import React from "react";
import CloudConsultingPanel from "../../../../components/services/cloud/cloudConsulting";
import databaseClient from "../../../../tina/__generated__/databaseClient";
import SEO from "../../../../common/seo";

const CloudConsulting = async () => {
  const cloudConsultingData = await databaseClient.queries.CloudConsultingPage({
    relativePath: "CloudConsulting.json",
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
        title="Cloud Consulting | Linkfields Innovations"
        description="Cloud Consulting | Linkfields Innovations"
      />
      <meta name="robots" content="index, follow" />
      <link
        rel="canonical"
        href="https://www.linkfields.com/services/cloud/cloud-consulting"
      />
      <div>
        <CloudConsultingPanel
          data={JSON.parse(JSON.stringify(cloudConsultingData))}
          blogPosts={JSON.parse(JSON.stringify(blogsPosts))}
          featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
          contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
        />
      </div>
    </>
  );
};

export default CloudConsulting;
