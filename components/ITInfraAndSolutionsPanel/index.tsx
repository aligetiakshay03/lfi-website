"use client";
import React, { useRef } from "react";
import ServicesHeroSection from "../../common/services/heroSection";
import MessageBanner from "../../common/MessageBanner";
import { IPersistentlyInnovative } from "../../interfaces/persistentlyInnovative";
import PersistentlyInnovativeBlock from "../../common/PersistentlyInnovative";
import { useTina } from "tinacms/dist/react";
import { IConstantlyInnovating } from "../../interfaces/constantlyInnovating";
import ConstantlyInnovatingBlock from "../../common/ConstantlyInnovating";
import ServicePageTabs from "../../common/services/ServicePageTabs";
import {
    CloudTabItems,
    ContactusbannerQuery,
    It_Infra_And_Solutions,
    It_Infra_And_SolutionsTabItems,
} from "../../tina/__generated__/types";
import ContactUsForm from "../ContactUsForm";
import { IFeaturedBlogs } from "../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../interfaces/contactUs";
import FeaturedBlogsPreview from "../FeaturedBlogsPreview";
import ContactusBanner from "../ContactusBanner";
import { IITInfraAndSolutions } from "../../interfaces/ITInfraAndSolutions";

interface ITInfraAndSolutionsPanelProps {
    persistentlyInnovative: IPersistentlyInnovative;
    constantlyInnovating: IConstantlyInnovating;
    data: IITInfraAndSolutions;
    featuredBlogs: IFeaturedBlogs;
    contactUsBanner: IContactUsBanner;
}
const ITInfraAndSolutionsPanel = ({
    persistentlyInnovative,
    constantlyInnovating,
    data,
    featuredBlogs,
    contactUsBanner
}: ITInfraAndSolutionsPanelProps) => {
    const { data: persistentlyInnovativeData } = useTina(persistentlyInnovative);
    const { data: constantlyInnovatingData } = useTina(constantlyInnovating);
    const { data: ITInfraAndSolutionsData } = useTina(data);


    const { data: featuredBlogsList } = useTina(featuredBlogs)
    const { data: contactUsBannerData } = useTina(contactUsBanner)

    const { heroSectionData, messageBannerData, messageBannerData2, tabItems } = ITInfraAndSolutionsData.IT_Infra_And_Solutions;
    const heroSectionDataComponent = {
        ...heroSectionData,
        component: tabItems && tabItems.length > 0 && (
            <ServicePageTabs tabItems={tabItems as It_Infra_And_SolutionsTabItems[]} />
        ),
    };

    const whyusRef = useRef<HTMLDivElement>(null);
    const ourexpertiseRef = useRef<HTMLDivElement>(null);
    const overviewRef = useRef<HTMLDivElement>(null);
    const whatWeOfferRef = useRef<HTMLDivElement>(null);


    const gettouchref = useRef<HTMLDivElement>(null);


    return (
        <div>

            <ServicesHeroSection {...heroSectionDataComponent} refs={{
                whatWeOffer: whatWeOfferRef,

            }} ref={overviewRef} refLabels={[{ name: "OVERVIEW", ref: overviewRef }, { name: "WHAT WE OFFER", ref: whatWeOfferRef }, { name: "WHY US", ref: whyusRef }, { name: "OUR EXPERTISE", ref: ourexpertiseRef }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />
            <MessageBanner {...messageBannerData} />
            <PersistentlyInnovativeBlock ref={whyusRef}
                persistentlyInnovativeData={persistentlyInnovativeData}
            />
            <ConstantlyInnovatingBlock ref={ourexpertiseRef}
                constantlyInnovatingData={constantlyInnovatingData}
            />
            <MessageBanner {...messageBannerData2} />
            <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0, 3)} />

            <ContactUsForm darkTheme={true} ref={gettouchref} />
            <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />

        </div>
    );
};

export default ITInfraAndSolutionsPanel;
