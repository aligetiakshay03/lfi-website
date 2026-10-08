import React from 'react'
import databaseClient from '../../../tina/__generated__/databaseClient'
import OilAndGasPanel from '../../../components/industries/oilandgas'
import SEO from '../../../common/seo'

const OilandGas = async () => {
    const oilData = await databaseClient.queries.oilandgas({ relativePath: "OilandGas.json" })
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
                title="Oil & Gas | Linkfields Innovations"
                description="Oil & Gas | Linkfields Innovations"
            />
            <meta name='robots' content='index, follow' />
            <OilAndGasPanel
                featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
                contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
                buildingsTools={JSON.parse(JSON.stringify(buildingsTools))}
                data={JSON.parse(JSON.stringify(oilData))}
            />
        </>
    )
}

export default OilandGas