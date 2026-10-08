import React from 'react'
import databaseClient from '../../../tina/__generated__/databaseClient'
import FintechPanel from '../../../components/industries/fintech'
import SEO from '../../../common/seo'

const Fintech = async () => {
    const fintechData = await databaseClient.queries.fintech({ relativePath: "Fintech.json" })
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
                title="Fintech | Linkfields Innovations"
                description="Fintech | Linkfields Innovations"
            />
            <meta name='robots' content='index, follow' />
            <FintechPanel
               featuredBlogs={JSON.parse(JSON.stringify(featuredBlogs))}
               contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))}
                buildingsTools={JSON.parse(JSON.stringify(buildingsTools))}
                data={JSON.parse(JSON.stringify(fintechData))}
            />
        </>
    )
}

export default Fintech