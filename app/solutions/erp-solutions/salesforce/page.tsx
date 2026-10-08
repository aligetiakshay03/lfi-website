import React from "react";
import databaseClient from "../../../../tina/__generated__/databaseClient";
import SEO from "../../../../common/seo";
import SalesforcePanel from "../../../../components/solutions/salesforce";

const Salesforce = async () => {
  const salesforce = await databaseClient.queries.salesforce({
    relativePath: "Salesforce.json",
  });

  const persistentlyInnovativeData =
    await databaseClient.queries.persistentlyInnovative({
      relativePath: "presistentlyInnovative.json",
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
        title="Salesforce ERP Solutions and Consulting Services | Linkfields Innovations"
        description="Linkfields Innovations provies Salesforce ERP solutions and consulting services for seamless business integration and growth."
        keywords="Salesforce consulting services, Salesforce implementation services, salesforce implementation partner, salesforce integration, salesforce migration, salesforce support"
      />
      <meta name="robots" content="index, follow" />
      <div>
        <SalesforcePanel
          data={JSON.parse(JSON.stringify(salesforce))}
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

export default Salesforce;
