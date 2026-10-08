"use server";
import React from "react";
import CloudMigrationPanel from "../../../../components/services/cloud/cloudMigration";
import databaseClient from "../../../../tina/__generated__/databaseClient";
import SEO from "../../../../common/seo";

async function CloudMigration() {
  const cloudMigrationData = await databaseClient.queries.cloudMigration({
    relativePath: "CloudMigration.json",
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
        title="Cloud Migration | Linkfields Innovations"
        description="Cloud Migration | Linkfields Innovations"
      />
      <meta name='robots' content='index, follow' />
    <div>
      <CloudMigrationPanel
        data={JSON.parse(JSON.stringify(cloudMigrationData))}
        featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
        contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
      />
    </div>
    </>
  );
}

export default CloudMigration;
