import React from "react";
import SapHanaPanel from "../../../../../components/solutions/sap/sap-hana";
import databaseClient from "../../../../../tina/__generated__/databaseClient";
import SEO from "../../../../../common/seo";

const SAP = async () => {
  const sapHana = await databaseClient.queries.sap_hana({
    relativePath: "sap-hana.json",
  });

  // const persistentlyInnovativeData =
  //   await databaseClient.queries.persistentlyInnovative({
  //     relativePath: "presistentlyInnovative.json",
  //   });

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
        title="SAP HANA"
        description="SAP HANA | Linkfields Innovations"
      />
    <div>
      <SapHanaPanel
        data={JSON.parse(JSON.stringify(sapHana))}
        featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
        contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
      />
    </div>
    </>
  );
};

export default SAP;
