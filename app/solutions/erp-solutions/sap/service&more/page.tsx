import React from "react";
import databaseClient from "../../../../../tina/__generated__/databaseClient";
import ServiceAndMorePanel from "../../../../../components/solutions/sap/service&more";
import SEO from "../../../../../common/seo";

const ServiceAndMore = async () => {
  const serviceAndMore = await databaseClient.queries.serviceAndMore({
    relativePath: "service&more.json",
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
        title="Service & More"
        description="Service & More | Linkfields Innovations"
      />
    <div>
      <ServiceAndMorePanel
        data={JSON.parse(JSON.stringify(serviceAndMore))}
        featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
        contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
      />
    </div>
    </>
  );
};

export default ServiceAndMore;
