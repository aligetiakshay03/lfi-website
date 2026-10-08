import React from "react";
import databaseClient from "../../../../tina/__generated__/databaseClient";
import TechnologyAdvisoryPanel from "../../../../components/services/consulting/technologyAdvisory";
import SEO from "../../../../common/seo";

const TechnologyAdvisory = async () => {
  const techAdvisoryData = await databaseClient.queries.techAdvisory({
    relativePath: "TechnologyAdvisory.json",
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
        title="Technology Advisory & Consulting Services | Linkfields Innovations"
        description="Technology Advisory | Linkfields Innovations"
        keywords="technology advisory services, technology advisory consulting"
      />
      <meta name='robots' content='index, follow' />
    <div>
      <TechnologyAdvisoryPanel
        data={JSON.parse(JSON.stringify(techAdvisoryData))}
        featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
        contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}      />
    </div>
    </>
  );
};

export default TechnologyAdvisory;
