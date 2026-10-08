import React from 'react'
import databaseClient from '../../../tina/__generated__/databaseClient'
import AboutUsPanel from '../../../components/Company/AboutUs'
import SEO from '../../../common/seo'

const AboutUs = async () => {
  const aboutUs = await databaseClient.queries.aboutUs({ relativePath: "AboutUs.json" })
  const constantlyInnovating = await databaseClient.queries.constantlyInnovating({ relativePath: "constantlyInnovating.json" })
  const featuredBlogs = await databaseClient.queries.featuredBlogs({ relativePath: "FeaturedBlogs.json" })
  const carrersData=await databaseClient.queries.careersPage({relativePath:"CareersPage.json"});

  const contactUsBanner = await databaseClient.queries.contactusbanner({
    relativePath: "ContactBannerIcons.json",
  });
  return (
    <>
      <SEO title="About Us | Linkfields Innovations" description="About Us | Linkfields Innovations" />
      <meta name='robots' content='index, follow' />
      <div>
        <AboutUsPanel data={JSON.parse(JSON.stringify(aboutUs))}
          constantlyInnovating={JSON.parse(JSON.stringify(constantlyInnovating))}
          featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
          contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
          carrersData={JSON.parse(JSON.stringify(carrersData))}/>
      </div>
    </>
  )
}

export default AboutUs