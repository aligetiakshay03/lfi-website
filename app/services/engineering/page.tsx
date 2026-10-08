"use server";
import React from "react";
import databaseClient from "../../../tina/__generated__/databaseClient";
import EngineeringComponent from "../../../components/services/EngineeringComponent";
import SEO from "../../../common/seo";

const Engineering = async () => {
  const engineering = await databaseClient.queries.engineering({
    relativePath: "Engineering.json",
  });
  const constantlyInnovatingData =
    await databaseClient.queries.constantlyInnovating({
      relativePath: "constantlyInnovating.json",
    });
  const persistentlyInnovativeData =
    await databaseClient.queries.persistentlyInnovative({
      relativePath: "presistentlyInnovative.json",
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
        title="Engineering and Development Services | Linkfields Innovations"
        description="Engineering | Linkfields Innovations"
        keywords="linkfields innovations, engineering, cloud engineering, software engineering, application development"
      />
      <meta name="robots" content="index, follow" />
      <EngineeringComponent
        data={JSON.parse(JSON.stringify(engineering))}
        constantlyInnovating={JSON.parse(
          JSON.stringify(constantlyInnovatingData)
        )}
        persistentlyInnovative={JSON.parse(
          JSON.stringify(persistentlyInnovativeData)
        )}
        featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
        contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
      />
    </>
  );
};

export default Engineering;
