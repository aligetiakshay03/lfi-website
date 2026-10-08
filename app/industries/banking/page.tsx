"use server";
import React from "react";
import BankingPanel from "../../../components/industries/banking";
import databaseClient from "../../../tina/__generated__/databaseClient";
import SEO from "../../../common/seo";

async function Banking() {
  const banking = await databaseClient.queries.banking({
    relativePath: "banking.json",
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
        title="Banking Automation & Engineering | Linkfields Innovations"
        description="We are a leading banking company with a proven track record in providing clients with a wide range of banking products and services."
      />
      <meta name='robots' content='index, follow' />
      <div>
        <BankingPanel
          data={JSON.parse(JSON.stringify(banking))}
          featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
          contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
          buildingsTools={JSON.parse(JSON.stringify(buildingsTools))}
        />
      </div>
    </>
  );
}

export default Banking;
