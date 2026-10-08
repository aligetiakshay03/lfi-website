"use server";
import React from "react";
import databaseClient from "../../../tina/__generated__/databaseClient";
import InsurancePanel from "../../../components/industries/insurance";
import SEO from "../../../common/seo";

async function Insurance() {
  const insurance = await databaseClient.queries.insurance({
    relativePath: "insurance.json",
  });

  const blogsPosts = await databaseClient.queries.blogsCollection({
    relativePath: "blogs-section.json",
  });

  const buildingsTools = await databaseClient.queries.buildingsTools({
    relativePath: "buildings-tools.json",
  });

  const featuredBlogs = await databaseClient.queries.featuredBlogs({ relativePath: "FeaturedBlogs.json" })

  const contactUsBanner = await databaseClient.queries.contactusbanner({
    relativePath: "ContactBannerIcons.json",
  });

  return (
    <>
      <SEO 
        title="Insurance| Linkfields Innovations"
        description="We are a leading insurance company with a proven track record in providing clients with a wide range of insurance products and services."
      />
      <meta name='robots' content='index, follow' />
    <div>
      <InsurancePanel
        data={JSON.parse(JSON.stringify(insurance))}
        featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
        contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
        buildingsTools={JSON.parse(JSON.stringify(buildingsTools))}
      />
    </div>
    </>
  );
}

export default Insurance;
