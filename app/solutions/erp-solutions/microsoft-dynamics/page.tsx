import React from "react";
import MicrosoftDynamicsPanel from "../../../../components/solutions/microsoft-dynamics";
import databaseClient from "../../../../tina/__generated__/databaseClient";
import SEO from "../../../../common/seo";

const MicrosoftDynamics = async () => {
  const microsoftDynamics = await databaseClient.queries.microsoftDynamics({
    relativePath: "microsoft-dynamics.json",
  });

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
        title="Microsoft Dynamics 365 CRM Services | Linkfields Innovations"
        description="Linkfields Innovations: Expert in Microsoft Dynamics 365 implementation, integration, and solutions, including Office 365 integrations and consulting."
        keywords="Linkfields innovations, microsoft dynamics 365, MS D365, dynamics 365 development, office 365 integrations, dynamic 365 consulting"
      />
      <meta name="robots" content="index, follow" />
      <div>
        <MicrosoftDynamicsPanel
          data={JSON.parse(JSON.stringify(microsoftDynamics))}
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

export default MicrosoftDynamics;
