"use server";
import React from "react";
import databaseClient from "../../../../tina/__generated__/databaseClient";
import ApplicationDevelopmentPanel from "../../../../components/services/Engineering/ApplicationDevelopmentPanel";
import SEO from "../../../../common/seo";

const ApplicationDevelopment = async () => {
  const applicationDevelopment =
    await databaseClient.queries.applicationDevelopment({
      relativePath: "applicationDevelopment.json",
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
      title="linkfields innovations, engineering, cloud engineering, software engineering, application development"
      description="Application developement | Linkfields Innovations"
      keywords="application development, custom application development, app maintainance, custom software development, application design, app design, app development, app support, app integration"
    />
    <meta name='robots' content='index, follow' />
    <div>
      <ApplicationDevelopmentPanel
        data={JSON.parse(JSON.stringify(applicationDevelopment))}
        featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
        contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
      />
    </div>
    </>
  );
};

export default ApplicationDevelopment;
