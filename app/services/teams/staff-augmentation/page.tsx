"use server";
import React from "react";
import databaseClient from "../../../../tina/__generated__/databaseClient";
import StaffAugmentationPanel from "../../../../components/services/teams/staffAugmentation";
import SEO from "../../../../common/seo";

async function StaffAugmentation() {
  const staffAugmentation = await databaseClient.queries.staffAugmentation({
    relativePath: "staff-augmentation.json",
  });

  const constantlyInnovatingData =
    await databaseClient.queries.constantlyInnovating({
      relativePath: "constantlyInnovating.json",
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
        title="Staff Augumentation | Linkfields Innovations"
        description="Staff Augmentation | Linkfields Innovations"
      />
      <meta name='robots' content='index, follow' />
      <div>
        <StaffAugmentationPanel
          data={JSON.parse(JSON.stringify(staffAugmentation))}
          constantlyInnovating={JSON.parse(
            JSON.stringify(constantlyInnovatingData)
          )}
          featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
          contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
        />
      </div>
    </>
  );
}

export default StaffAugmentation;
