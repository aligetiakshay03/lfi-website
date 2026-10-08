"use server";
import React from "react";
import AutomationPanel from "../../../components/AutomationPanel";
import databaseClient from "../../../tina/__generated__/databaseClient";
import SEO from "../../../common/seo";

const Automation = async () => {
  const persistentlyInnovativeData =
    await databaseClient.queries.persistentlyInnovative({
      relativePath: "presistentlyInnovative.json",
    });

  const constantlyInnovatingData =
    await databaseClient.queries.constantlyInnovating({
      relativePath: "constantlyInnovating.json",
    });

  const automation = await databaseClient.queries.automation({
    relativePath: "Automation.json",
  });

  const featuredBlogs = await databaseClient.queries.featuredBlogs({ relativePath: "FeaturedBlogs.json" })

  const contactUsBanner = await databaseClient.queries.contactusbanner({
    relativePath: "ContactBannerIcons.json",
  });
  return (
    <>
      <SEO
        title="Automation Services | Linkfields Innovations"
        description="Automation | Linkfields Innovations"
      />
      <meta name='robots' content='index, follow' />
      <div>
        <AutomationPanel
          data={JSON.parse(JSON.stringify(automation))}
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

export default Automation;
