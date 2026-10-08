"use server";
import SEO from "../common/seo";
import { Page } from "../components/page";
import databaseClient from "../tina/__generated__/databaseClient";

export default async function Home() {
  const [
    homePage,
    blogsPosts,
    featuredBlogs,
    contactUsBanner,
    navbar,
    aboutUs,
    ourApproach,
    careersPage,
  ] = await Promise.all([
    databaseClient.queries.home({
      relativePath: "homePage.json",
    }),
    databaseClient.queries.blogsCollection({
      relativePath: "blogs-section.json",
    }),
    databaseClient.queries.featuredBlogs({
      relativePath: "FeaturedBlogs.json",
    }),
    databaseClient.queries.contactusbanner({
      relativePath: "ContactBannerIcons.json",
    }),
    databaseClient.queries.navbar({ relativePath: "navbar.json" }),
    databaseClient.queries.aboutUs({ relativePath: "AboutUs.json" }),
    databaseClient.queries.ourApproach({ relativePath: "Our approach.json" }),
    databaseClient.queries.careersPage({ relativePath: "CareersPage.json" }),
  ]);

  return (
    <>
      <SEO
        title="Global IT Services & Solutions | Linkfields Innovations"
        description="Linkfields Innovations is a leading provider of IT services driving digital transformation and optimizing business operations. Explore our innovative solutions!"
        keywords="Linkfields innovation, digital transformation, odoo solutions, IT services, SAP solutions, salesforce integration, ERP solutions"
      />
      <meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />
      <Page
        homePage={JSON.parse(JSON.stringify(homePage))}
        blogPosts={JSON.parse(JSON.stringify(blogsPosts))}
        featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
        contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
        navbar={JSON.parse(JSON.stringify(navbar))}
        aboutUs={JSON.parse(JSON.stringify(aboutUs))}
        ourApproach={JSON.parse(JSON.stringify(ourApproach))}
        careersPage={JSON.parse(JSON.stringify(careersPage))}
      />
    </>
  );
}
