"use server";
import React from "react";
import IPaasPanel from "../../../../components/services/cloud/iPaaS";
import databaseClient from "../../../../tina/__generated__/databaseClient";
import SEO from "../../../../common/seo";

const IPaas = async () => {
  const iPaaSData = await databaseClient.queries.iPaaS({
    relativePath: "iPaaS.json",
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
        title="iPaaS and Cloud-based Solutions | Linkfields Innovations "
        description="Your Partner for advanced iPaaS: Offering expert iPaaS implementation services to streamline and enhance your business operations."
        keywords="ipaas solutions, cloud management, cloud-based solutions, linkfields innovation"
      />
      <meta name="robots" content="index, follow" />
      <div>
        <IPaasPanel
          data={JSON.parse(JSON.stringify(iPaaSData))}
          featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
          contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
        />
      </div>
    </>
  );
};

export default IPaas;
