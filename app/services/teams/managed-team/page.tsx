"use server";
import React from "react";
import databaseClient from "../../../../tina/__generated__/databaseClient";
import ManagedTeamPanel from "../../../../components/services/teams/managedTeam";
import SEO from "../../../../common/seo";

async function ManagedTeam() {
  const managedTeam = await databaseClient.queries.managedTeam({
    relativePath: "ManagedTeam.json",
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
        title="Manage Teams | Linkfields Innovations"
        description="Managed Team | Linkfields Innovations"
      />
      <meta name='robots' content='index, follow' />
    <div>
      <ManagedTeamPanel
        data={JSON.parse(JSON.stringify(managedTeam))}
        featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
        contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}      />
    </div>
    </>
  );
}

export default ManagedTeam;
