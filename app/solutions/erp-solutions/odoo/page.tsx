import React from "react";
import OdooPanel from "../../../../components/solutions/odoo";
import databaseClient from "../../../../tina/__generated__/databaseClient";
import SEO from "../../../../common/seo";

const Odoo = async () => {
  const odoo = await databaseClient.queries.odoo({
    relativePath: "odoo.json",
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
        title="Odoo ERP Implementation Company | Linkfields Innovations"
        description="Linkfields Innovations provides customized end-to-end Odoo solutions and services to simplify your business process"
        keywords="Linkfields Innovations, Odoo solutions, odoo services, Odoo business integration, Odoo implementation, odoo data migration"
      />
      <meta name="robots" content="index, follow" />

      <div>
        <OdooPanel
          data={JSON.parse(JSON.stringify(odoo))}
          featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
          contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
        />
      </div>
    </>
  );
};

export default Odoo;
