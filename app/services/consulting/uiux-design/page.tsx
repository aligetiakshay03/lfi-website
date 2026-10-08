"use server";
import React from "react";
import UIUXComponent from "../../../../components/services/consulting/uiux";
import databaseClient from "../../../../tina/__generated__/databaseClient";
import SEO from "../../../../common/seo";

async function UIUX() {
  const data = await databaseClient.queries.uiux({
    relativePath: "UI-UX.json",
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
        title="UX/UI Design Consulting | Linkfields Innovations"
        description="UI/UX Design | Linkfields Innovations"
        keywords="ux/ui design services, ux/ui design solutions, ux/ui implementation"
      />
      <meta name='robots' content='index, follow' />
    <div>
      <UIUXComponent
        data={JSON.parse(JSON.stringify(data))}
        featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
        contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}      />
    </div>
    </>
  );
}

export default UIUX;
