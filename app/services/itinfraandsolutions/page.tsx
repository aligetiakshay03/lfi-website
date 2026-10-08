"use server";
import React from "react";
import databaseClient from "../../../tina/__generated__/databaseClient";
import ITInfraAndSolutionsPanel from "../../../components/ITInfraAndSolutionsPanel";
import SEO from "../../../common/seo";

const IITInfraAndSolutions = async () => {
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

  const IITInfraAndSolutions =
    await databaseClient.queries.IT_Infra_And_Solutions({
      relativePath: "IITInfraAndSolutions.json",
    });
  return (
    <>
      <SEO
        title="IT Infrastucture & Solutions | Linkfields Innovations"
        description="IT Infrastucture & Solutions | Linkfields Innovations"
      />
      <meta name="robots" content="index, follow" />

      <div>
        <ITInfraAndSolutionsPanel
          data={JSON.parse(JSON.stringify(IITInfraAndSolutions))}
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

export default IITInfraAndSolutions;
