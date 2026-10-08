import React from 'react'
import databaseClient from '../../../../../tina/__generated__/databaseClient'
import SapSpecialExpertisePanel from '../../../../../components/solutions/sap/sap-special-expertise'
import SEO from '../../../../../common/seo'

const SAPSpecialExpertise = async () => {
  const data = await databaseClient.queries.sapSpecialExpertise({ relativePath: "SapSpecialExpertise.json" })
  const blogs = await databaseClient.queries.blogsCollection({ relativePath: "blogs-section.json" })
  const featuredBlogs = await databaseClient.queries.featuredBlogs({ relativePath: "FeaturedBlogs.json" })

  const contactUsBanner = await databaseClient.queries.contactusbanner({
    relativePath: "ContactBannerIcons.json",
  });
  return (
    <>
      <SEO
        title="SAP Special Expertise"
        description="SAP Special Expertise | Linkfields Innovations"
      />
      <div>
        <SapSpecialExpertisePanel data={JSON.parse(JSON.stringify(data))}
          featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
          contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))} />
      </div>
    </>
  )
}

export default SAPSpecialExpertise