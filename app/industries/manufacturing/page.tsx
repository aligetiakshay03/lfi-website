"use server";
import React from "react";
import databaseClient from "../../../tina/__generated__/databaseClient";
import SEO from "../../../common/seo";
import ManufacturingPanel from "../../../components/industries/manufacturing";

async function Manufacturing() {
  const manufacturing = await databaseClient.queries.manufacturing({
    relativePath: "manufacturing.json",
  });

  const blogsPosts = await databaseClient.queries.blogsCollection({
    relativePath: "blogs-section.json",
  });

  const buildingsTools = await databaseClient.queries.buildingsTools({
    relativePath: "buildings-tools.json",
  });

  const featuredBlogs = await databaseClient.queries.featuredBlogs({ relativePath: "FeaturedBlogs.json" })

  const contactUsBanner = await databaseClient.queries.contactusbanner({
    relativePath: "ContactBannerIcons.json",
  });

  return (
    <>
      <SEO 
        title="Manufacturing | Linkfields Innovations"
        description="We are a leading manufacturing company with a proven track record in providing clients with a wide range of manufacturing products and services."
      />
      <meta name='robots' content='index, follow' />
    <div>
      <ManufacturingPanel
        data={JSON.parse(JSON.stringify(manufacturing))}
        featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
        contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
        buildingsTools={JSON.parse(JSON.stringify(buildingsTools))}
      />
    </div>
    </>
  );
}

export default Manufacturing;
