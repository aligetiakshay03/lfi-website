"use server";
import React from "react";
import SolutionDiscoveryPanel from "../../../../components/services/consulting/solutionDiscovery";
import databaseClient from "../../../../tina/__generated__/databaseClient";
import SEO from "../../../../common/seo";

const SolutionDiscovery = async () => {
  const solutionDiscovery = await databaseClient.queries.solutionDiscovery({
    relativePath: "SolutionDiscovery.json",
  });

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
        title="Solution Discovery and Strategy Planning | Linkfields Innovations"
        description="Solution Discovery | Linkfields Innovations"
        keywords="solution discovery, strategy planning, solution discovery services"
      />
      <meta name='robots' content='index, follow' />
      <div>
        <SolutionDiscoveryPanel
          data={JSON.parse(JSON.stringify(solutionDiscovery))}
          featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
          contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}        />
      </div>
    </>
  );
};

export default SolutionDiscovery;
