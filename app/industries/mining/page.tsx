import React from 'react'
import databaseClient from '../../../tina/__generated__/databaseClient'
import MiningPanel from '../../../components/industries/mining'
import SEO from '../../../common/seo'

const Mining = async () => {
    const miningData = await databaseClient.queries.mining({ relativePath: "Mining.json" })
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
                title="Mining | Linkfields Innovations"
                description="Mining | Linkfields Innovations"
            />
            <meta name='robots' content='index, follow' />
            <MiningPanel
                featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
                contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
                buildingsTools={JSON.parse(JSON.stringify(buildingsTools))}
                data={JSON.parse(JSON.stringify(miningData))}
            />
        </>
    )
}

export default Mining