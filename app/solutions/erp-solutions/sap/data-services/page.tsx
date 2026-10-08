import React from "react";
import databaseClient from "../../../../../tina/__generated__/databaseClient";
import DataServiecsPanel from "../../../../../components/solutions/sap/data-services";
import SEO from "../../../../../common/seo";

const DataServices = async () => {
  const dataServices = await databaseClient.queries.dataServices({
    relativePath: "data-services.json",
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
      title="Data Services"
      description="Data Services | Linkfields Innovations"
    />
    <div>
      <DataServiecsPanel
        data={JSON.parse(JSON.stringify(dataServices))}
        featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
        contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
      />
    </div>
    </>
  );
};

export default DataServices;
