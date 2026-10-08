import React from 'react'
import databaseClient from '../../../tina/__generated__/databaseClient'
import { relative } from 'path'
import ERPSolutionsPanel from '../../../components/solutions/ERPSolutions'
import SEO from '../../../common/seo'

const ERPSolutions = async () => {
  const erpSolutionsData = await databaseClient.queries.erpSolutions({ relativePath: "ERPSolutions.json" })
  const featuredBlogs = await databaseClient.queries.featuredBlogs({ relativePath: "FeaturedBlogs.json" })
  const contactUsBanner = await databaseClient.queries.contactusbanner({
    relativePath: "ContactBannerIcons.json",
  });
  return (
    <>
      <SEO title="ERP Solutions" description='ERP Solutions | Linkfields Innovations' />
      <ERPSolutionsPanel data={JSON.parse(JSON.stringify(erpSolutionsData))}
        featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
        contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))} />
    </>
  )
}

export default ERPSolutions