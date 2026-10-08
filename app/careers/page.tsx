import { Carousel } from 'antd'
import React from 'react'
import databaseClient from '../../tina/__generated__/databaseClient'
import { CareersPage } from '../../tina/collections/Careers';
import CareersPanel from '../../components/CareersPage';
import SEO from '../../common/seo';

const Careers = async () => {
    //Testing
    const data = await databaseClient.queries.careersPage({ relativePath: "CareersPage.json" });
    const contactUsBanner = await databaseClient.queries.contactusbanner({
        relativePath: "ContactBannerIcons.json",
    });
    const contactUs = await databaseClient.queries.contactUsPage({
        relativePath: "contact-us.json",
    });
    return (
        <>
            <SEO title="Careers" description="Careers | Linkfields Innovations" />
            <CareersPanel data={JSON.parse(JSON.stringify(data))} contactUs={JSON.parse(JSON.stringify(contactUs))} contactUsBanner={JSON.parse(JSON.stringify(contactUsBanner))} />

        </>
    )
}

export default Careers
