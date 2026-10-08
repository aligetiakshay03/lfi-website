import React from 'react'
import databaseClient from '../../../../../tina/__generated__/databaseClient'
import CoreSapExpertisePanel from '../../../../../components/solutions/sap/core-sap-expertise'
import SEO from '../../../../../common/seo'

const CoreSapExpertise = async () => {
  const data = await databaseClient.queries.coreSapExpertise({ relativePath: "CoreSapExpertisePage.json" })
  const featuredBlogs = await databaseClient.queries.featuredBlogs({ relativePath: "FeaturedBlogs.json" })

  const contactUsBanner = await databaseClient.queries.contactusbanner({
    relativePath: "ContactBannerIcons.json",
  });
  return (
    <>
      <SEO
        title="Core SAP Expertise"
        description="Core SAP Expertise | Linkfields Innovations"
      />
      <CoreSapExpertisePanel data={JSON.parse(JSON.stringify(data))}
        featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
        contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))} />
    </>
  )
}

export default CoreSapExpertise