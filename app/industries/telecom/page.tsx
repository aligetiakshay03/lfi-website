"use server";
import React from "react";
import databaseClient from "../../../tina/__generated__/databaseClient";
import TelecomPanel from "../../../components/industries/telecom";
import SEO from "../../../common/seo";

async function Telecom() {
  const telecom = await databaseClient.queries.telecom({
    relativePath: "telecom.json",
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
        title="Telecom | Linkfields Innovations"
        description="Telecom | Linkfields Innovations"
      />
      <meta name='robots' content='index, follow' />
      <div>
        <TelecomPanel
          data={JSON.parse(JSON.stringify(telecom))}
          featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
          contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
          buildingsTools={JSON.parse(JSON.stringify(buildingsTools))}
        />
      </div>
    </>
  );
}

export default Telecom;
