import React from "react";
import SapPanel from "../../../../components/solutions/sap";
import databaseClient from "../../../../tina/__generated__/databaseClient";
import SEO from "../../../../common/seo";

const SAP = async () => {
  const sap = await databaseClient.queries.sap({
    relativePath: "sap.json",
  });
  // console.log("Sao", sap)
  const persistentlyInnovativeData =
    await databaseClient.queries.persistentlyInnovative({
      relativePath: "presistentlyInnovative.json",
    });

  const blogsPosts = await databaseClient.queries.blogsCollection({
    relativePath: "blogs-section.json",
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
        title="SAP ERP Consulting and Implementation Solutions | Linkfields Innovations"
        description="Linkfields Innovations offers SAP software consulting & implementation solutions to businesses in various industries."
        keywords="Linkfields innovations, SAP solutions, ERP Solutions, SAP implementation, SAP Integration, SAP services"
      />
      <meta name="robots" content="index, follow" />
      <div>
        <SapPanel
          data={JSON.parse(JSON.stringify(sap))}
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

export default SAP;
