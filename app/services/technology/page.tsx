"use server";
import React from "react";
import ServicePageTabs from "../../../common/services/ServicePageTabs";
import TechnologyPanel from "../../../components/TechnologyPanel";
import databaseClient from "../../../tina/__generated__/databaseClient";
import SEO from "../../../common/seo";

const Technology = async () => {
  const persistentlyInnovativeData =
    await databaseClient.queries.persistentlyInnovative({
      relativePath: "presistentlyInnovative.json",
    });

  const constantlyInnovatingData =
    await databaseClient.queries.constantlyInnovating({
      relativePath: "constantlyInnovating.json",
    });

  const technology = await databaseClient.queries.technology({
    relativePath: "Technology.json",
  });

  const featuredBlogs = await databaseClient.queries.featuredBlogs({
    relativePath: "FeaturedBlogs.json",
  });

  const contactUsBanner = await databaseClient.queries.contactusbanner({
    relativePath: "ContactBannerIcons.json",
  });

  return (
    <>
      <SEO
        title="Technology Services | Linkfields Innovations"
        description="Technology | Linkfields Innovations"
        keywords="Technology services, big data engineering, Artificial Intelligence, machine learning"
      />
      <meta name="robots" content="index, follow" />
      <div>
        <TechnologyPanel
          data={JSON.parse(JSON.stringify(technology))}
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

export default Technology;
