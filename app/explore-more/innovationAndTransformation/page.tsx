import React from "react";
import databaseClient from "../../../tina/__generated__/databaseClient";
import SEO from "../../../common/seo";
import InnovationAndTransformationPanel from "../../../components/InnovationAndTransformation/page";

const InnovationAndTransformation = async () => {
  const innovationAndTransformation = await databaseClient.queries.innovationAndTransformation({
    relativePath: "innovationAndTransformation.json",
  });

  const persistentlyInnovativeData =
    await databaseClient.queries.persistentlyInnovative({
      relativePath: "presistentlyInnovative.json",
    });

  const featuredBlogs = await databaseClient.queries.featuredBlogs({ relativePath: "FeaturedBlogs.json" })

  const contactUsBanner = await databaseClient.queries.contactusbanner({
    relativePath: "ContactBannerIcons.json",
  });

  return (
  <>
    <SEO
      title="Innovation And Transformation"
      description="Innovation And Transformation | Linkfields Innovations"
    />
    <div>
      <InnovationAndTransformationPanel
        data={JSON.parse(JSON.stringify(innovationAndTransformation))}
        featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
        contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
        persistentlyInnovative={JSON.parse(
          JSON.stringify(persistentlyInnovativeData)
        )}
      />
    </div>
  </>
  );
};

export default InnovationAndTransformation;
