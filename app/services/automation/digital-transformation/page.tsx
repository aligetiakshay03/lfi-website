"use server";
import React from "react";
import databaseClient from "../../../../tina/__generated__/databaseClient";
import DigitalTransformationPanel from "../../../../components/services/automation/digitalTransformation";
import SEO from "../../../../common/seo";

const DigitalTransformation = async () => {
  const digitalTransformation =
    await databaseClient.queries.digitalTransformation({
      relativePath: "Digital Transformation.json",
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
        title="Digital Transformation Consulting | Linkfields Innovations"
        description="Digital Transformation | Linkfields Innovations"
      />
      <meta name='robots' content='index, follow' />
    <div>
      <DigitalTransformationPanel
        data={JSON.parse(JSON.stringify(digitalTransformation))}
        blogPosts={JSON.parse(JSON.stringify(blogsPosts))}
        featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
        contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
      />
    </div>
    </>
  );
};

export default DigitalTransformation;
