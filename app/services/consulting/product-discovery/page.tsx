"use server";
import React from "react";
import ProductDiscoveryPanel from "../../../../components/services/consulting/productDiscovery";
import databaseClient from "../../../../tina/__generated__/databaseClient";
import SEO from "../../../../common/seo";

async function ProductDiscovery() {
  const productDiscovery = await databaseClient.queries.productDiscovery({
    relativePath: "ProductDiscovery.json",
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
        title="Product Discovery Services | Linkfields Innovations"
        description="Product Discovery | Linkfields Innovations"
        keywords="product discovery, product strategy, product discovery services"
      />
      <meta name='robots' content='index, follow' />
    <div>
      <ProductDiscoveryPanel
        data={JSON.parse(JSON.stringify(productDiscovery))}
        featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
        contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
      />
    </div>
    </>
  );
}

export default ProductDiscovery;
