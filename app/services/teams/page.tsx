"use server";
import React from "react";
import ServicePageTabs from "../../../common/services/ServicePageTabs";
import TeamsPanel from "../../../components/TeamsPanel";
import databaseClient from "../../../tina/__generated__/databaseClient";
import SEO from "../../../common/seo";

const Teams = async () => {
  const persistentlyInnovativeData =
    await databaseClient.queries.persistentlyInnovative({
      relativePath: "presistentlyInnovative.json",
    });

  const constantlyInnovatingData =
    await databaseClient.queries.constantlyInnovating({
      relativePath: "constantlyInnovating.json",
    });

  const teams = await databaseClient.queries.teams({
    relativePath: "Teams.json",
  });

  const featuredBlogs = await databaseClient.queries.featuredBlogs({ relativePath: "FeaturedBlogs.json" })

  const contactUsBanner = await databaseClient.queries.contactusbanner({
    relativePath: "ContactBannerIcons.json",
  });

  return (
    <>
      <SEO
        title="Teams | Linkfields Innovations"
        description="LFI's team of experts are passionate about innovation and are always on the lookout for new and exciting ways to work with clients and partners."
      />
      <meta name='robots' content='index, follow' />
    <div>
      <TeamsPanel
        persistentlyInnovative={JSON.parse(
          JSON.stringify(persistentlyInnovativeData)
        )}
        data={JSON.parse(JSON.stringify(teams))}
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

export default Teams;
