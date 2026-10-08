"use server";
import React from "react";
import RoboticProcessAutomationPanel from "../../../../components/services/automation";
import databaseClient from "../../../../tina/__generated__/databaseClient";
import SEO from "../../../../common/seo";
const RoboticProcessAutomation = async () => {
  const rpaData = await databaseClient.queries.roboticProcessAutomation({
    relativePath: "Robotic-process-automation.json",
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
        title="Robotic Process Automation (RPA) &  Development Services | Linkfields Innovations"
        description="Linkfields Innovations: Leading the way in automation services, including expert RPA consulting and innovative automation design."
        keywords="robotic process automation, RPA, automation process, rpa consulting, rpa development, automation design, automation support, task automation, linkfields innovations"
      />
      <meta name="robots" content="index, follow" />
      <div>
        <RoboticProcessAutomationPanel
          data={JSON.parse(JSON.stringify(rpaData))}
          blogPosts={JSON.parse(JSON.stringify(blogsPosts))}
          featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
          contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
        />
      </div>
    </>
  );
};

export default RoboticProcessAutomation;
