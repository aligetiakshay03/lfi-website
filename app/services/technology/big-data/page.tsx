"use server";
import React from "react";
import BigDataPanel from "../../../../components/services/technology/big-data";
import databaseClient from "../../../../tina/__generated__/databaseClient";
import SEO from "../../../../common/seo";

async function BigData() {
  const bigData = await databaseClient.queries.bigData({
    relativePath: "big-data.json",
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
        title="Big Data Engineering Services | Linkfields Innovations"
        description="Big Data | Linkfields Innovations"
      />
      <meta name='robots' content='index, follow' />
    <div>
      <BigDataPanel
        data={JSON.parse(JSON.stringify(bigData))}
        featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
        contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
      />
    </div>
    </>
  );
}

export default BigData;
