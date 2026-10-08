"use server";
import React from "react";
import databaseClient from "../../../tina/__generated__/databaseClient";
import FMCGPanel from "../../../components/industries/FMCG";
import SEO from "../../../common/seo";

async function FMCG() {
  const fmcg = await databaseClient.queries.fmcg({
    relativePath: "fmcg.json",
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
        title="FMCG Operations | Linkfields Innovations"
        description="FMCG | Linkfields Innovations"
      />
      <meta name='robots' content='index, follow' />
    <div>
      <FMCGPanel
        data={JSON.parse(JSON.stringify(fmcg))}
        featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
        contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
        buildingsTools={JSON.parse(JSON.stringify(buildingsTools))}
      />
    </div>
    </>
  );
}

export default FMCG;
