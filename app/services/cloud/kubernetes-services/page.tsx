"use server";
import React from "react";
import KubernetesServicesPanel from "../../../../components/services/cloud/kubernetesPanel";
import databaseClient from "../../../../tina/__generated__/databaseClient";
import SEO from "../../../../common/seo";

async function KubernetesServices() {
  const kubernetes = await databaseClient.queries.kubernetesServices({
    relativePath: "KubernetesServices.json",
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
        title="Kubernetes Services | Linkfields Innovations"
        description="Kubernetes Services | Linkfields Innovations"
      />
      <meta name='robots' content='index, follow' />
    <div>
      <KubernetesServicesPanel
        data={JSON.parse(JSON.stringify(kubernetes))}
        blogPosts={JSON.parse(JSON.stringify(blogsPosts))}
        featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
        contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
      />
    </div>
    </>
  );
}

export default KubernetesServices;
