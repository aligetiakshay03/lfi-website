"use server";
import React from "react";
import databaseClient from "../../../../tina/__generated__/databaseClient";
import QualityControlPanel from "../../../../components/services/Engineering/QualityControl";
import SEO from "../../../../common/seo";

const QualityControl = async () => {
  const qualityControl = await databaseClient.queries.qualityControl({
    relativePath: "qualityControl.json",
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
        title="Digital Quality Control and Assurance Services | Linkfields Innovations"
        description="Quality Control | Linkfields Innovations"
        keywords="Usability testing, test automation, performance testing, specialized testing, security testing, DevOps testing, agile testing, testing CoE, Automated testing process, continuous integration, test management, bug management, automation open source"
      />
      <meta name='robots' content='index, follow' />
      <div>
        <QualityControlPanel
          data={JSON.parse(JSON.stringify(qualityControl))}
          blogPosts={JSON.parse(JSON.stringify(blogsPosts))}
          featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
          contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
        />
      </div>
    </>
  );
};

export default QualityControl;
