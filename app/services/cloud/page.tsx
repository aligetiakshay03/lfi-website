"use server";
import React from "react";
import CloudPanel from "../../../components/CloudPanel";
import databaseClient from "../../../tina/__generated__/databaseClient";
import SEO from "../../../common/seo";

const Cloud = async () => {
  const persistentlyInnovativeData =
    await databaseClient.queries.persistentlyInnovative({
      relativePath: "presistentlyInnovative.json",
    });

  const constantlyInnovatingData =
    await databaseClient.queries.constantlyInnovating({
      relativePath: "constantlyInnovating.json",
    });

  const featuredBlogs = await databaseClient.queries.featuredBlogs({
    relativePath: "FeaturedBlogs.json",
  });

  const contactUsBanner = await databaseClient.queries.contactusbanner({
    relativePath: "ContactBannerIcons.json",
  });

  const cloud = await databaseClient.queries.cloud({
    relativePath: "Cloud.json",
  });

  return (
    <>
      <SEO
        title="Cloud Development, Migration & Integration | Linkfields Innovations"
        description="Cloud Development, Migration & Integration | Linkfields Innovations"
        keywords="cloud development, cloud migration, cloud integration, cloud services "
      />
      <meta name='robots' content='index, follow' />
      <div>
        <CloudPanel
          data={JSON.parse(JSON.stringify(cloud))}
          persistentlyInnovative={JSON.parse(
            JSON.stringify(persistentlyInnovativeData)
          )}
          constantlyInnovating={JSON.parse(
            JSON.stringify(constantlyInnovatingData)
          )}
          featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
          contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
        />
      </div>
    </>
  );
};

export default Cloud;
