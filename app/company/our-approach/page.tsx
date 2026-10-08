import React from "react";
import databaseClient from "../../../tina/__generated__/databaseClient";
import OurApproachPanel from "../../../components/Company/OurApproach";
import SEO from "../../../common/seo";

const OurApproach = async () => {
  const ourApproachData = await databaseClient.queries.ourApproach({
    relativePath: "Our approach.json",
  });
  const constantlyInnovating =
    await databaseClient.queries.constantlyInnovating({
      relativePath: "constantlyInnovating.json",
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
        title="Our Approach | Linkfields Innovations"
        description="Our Approach | Linkfields Innovations"
      />
      <meta name="robots" content="index, follow" />
      <OurApproachPanel
        data={JSON.parse(JSON.stringify(ourApproachData))}
        constantlyInnovating={JSON.parse(JSON.stringify(constantlyInnovating))}
        featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
        contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
      />
    </>
  );
};

export default OurApproach;
