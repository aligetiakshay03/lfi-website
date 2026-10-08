"use server";
import React from "react";
import databaseClient from "../../../../tina/__generated__/databaseClient";
import AiMlPanel from "../../../../components/services/technology/ai-ml";
import SEO from "../../../../common/seo";

async function AIML() {
  const aiMl = await databaseClient.queries.AiMl({
    relativePath: "ai-ml.json",
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
        title="AI & Machine Learning Services | Linkfields Innovations"
        description="AI & ML | Linkfields Innovations"
      />
      <meta name='robots' content='index, follow' />
    <div>
      <AiMlPanel
        data={JSON.parse(JSON.stringify(aiMl))}
        featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
        contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
      />
    </div>
    </>
  );
}

export default AIML;
