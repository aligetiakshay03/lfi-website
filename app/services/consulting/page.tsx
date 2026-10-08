"use server";
import React from "react";
import databaseClient from "../../../tina/__generated__/databaseClient";
import ConsultingComponent from "../../../components/services/ConsultingComponent";
import SEO from "../../../common/seo";

const Consulting = async () => {
  const consulting = await databaseClient.queries.consulting({
    relativePath: "Consulting.json",
  });
  const constantlyInnovatingData =
    await databaseClient.queries.constantlyInnovating({
      relativePath: "constantlyInnovating.json",
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
        title="Digital Transform Consulting | Linkfields Innovations"
        description="Consulting | Linkfields Innovations"
        keywords="linkfields innovations, consulting, digital consulting, UX/UI design consulting, product discovery, technology advisory, solution discovery, consulting services"
      />
      <meta name='robots' content='index, follow' />
      <ConsultingComponent
        data={JSON.parse(JSON.stringify(consulting))}
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

export default Consulting;
