"use server";
import React from "react";
import databaseClient from "../../../../tina/__generated__/databaseClient";
import DevOpsPanel from "../../../../components/services/Engineering/DevOps";
import SEO from "../../../../common/seo";

const Devops = async () => {
  const devOps = await databaseClient.queries.devOpsPage({
    relativePath: "devOps.json",
  });

  const blogsPosts = await databaseClient.queries.blogsCollection({
    relativePath: "blogs-section.json",
  });

  const featuredBlogs = await databaseClient.queries.featuredBlogs({ relativePath: "FeaturedBlogs.json" })

  const contactUsBanner = await databaseClient.queries.contactusbanner({
    relativePath: "ContactBannerIcons.json",
  });
  return (
    <>
      <SEO
        title="DevOps Consulting Services and Solutions | Linkfields Innovations"
        description="DevOps | Linkfields Innovations"
        keywords="devops services, devops integration, devops development, cloud migration , devsecops, linkfields innovations"
      />
      <meta name='robots' content='index, follow' />
      <div>
        <DevOpsPanel
          data={JSON.parse(JSON.stringify(devOps))}
          blogPosts={JSON.parse(JSON.stringify(blogsPosts))}
          featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
          contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
        />
      </div>
    </>
  );
};

export default Devops;
