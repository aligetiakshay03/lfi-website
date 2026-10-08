"use client";
import React, { useRef } from "react";
import ServicesHeroSection from "../../../common/services/heroSection";
import ContactUsForm from "../../ContactUsForm";
import { useTina } from "tinacms/dist/react";
import { ContactusbannerQuery, PersistentlyInnovativeQuery } from "../../../tina/__generated__/types";
import { IPersistentlyInnovative } from "../../../interfaces/persistentlyInnovative";
import { IFeaturedBlogs } from "../../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../../interfaces/contactUs";
import FeaturedBlogsPreview from "../../FeaturedBlogsPreview";
import ContactusBanner from "../../ContactusBanner";
import { ISalesforceProps } from "../../../interfaces/ISalesforce";
import SalesforceServices from "../../SalesforceServices";
import SolutionsReview from "../../SolutionsReview";
import WhyChooseUs from "../../whyChooseUs";
const SalesforcePanel = (props: {
    data: ISalesforceProps;
    featuredBlogs: IFeaturedBlogs;
    contactUsBanner: IContactUsBanner;
    persistentlyInnovative: IPersistentlyInnovative;
}) => {
    const { data: salesforceData } = useTina(props.data);
    const { data: featuredBlogsList } = useTina(props.featuredBlogs)
    const { data: contactUsBannerData } = useTina(props.contactUsBanner)
    const { heroSectionData, HowCanWeHelpSection, messageBannerData, Cards } =
        salesforceData?.salesforce;
    const howCanWeHelpSectionData = { ...HowCanWeHelpSection, cards: Cards };
    const { data: persistentlyInnovativeData } = useTina(
        props.persistentlyInnovative
    );
    const consultingserviceref = useRef<HTMLDivElement>(null);
    const salesforceserviceref = useRef<HTMLDivElement>(null);
    const WhyChooseUsref = useRef<HTMLDivElement>(null);
    const gettouchref = useRef<HTMLDivElement>(null);
    return (
        <div>
            <ServicesHeroSection {...heroSectionData} refLabels={[{ name: "CONSULTING SERVICES", ref: consultingserviceref }, { name: "Salesforce services", ref: salesforceserviceref }, { name: "Why us", ref: WhyChooseUsref },{ name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} hideComponent={true}/>
            <SolutionsReview ref={consultingserviceref} />
            <SalesforceServices ref={salesforceserviceref} />
            <WhyChooseUs ref={WhyChooseUsref} />
            <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0, 3)} />
            <ContactUsForm darkTheme={true} ref={gettouchref} />
            <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />
        </div>
    );
};
export default SalesforcePanel;
