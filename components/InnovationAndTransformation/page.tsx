"use client";
import React, { useRef } from "react";
import ServicesHeroSection from "../../common/services/heroSection";
import ContactUsForm from "../ContactUsForm";
import { useTina } from "tinacms/dist/react";
import { ContactusbannerQuery, PersistentlyInnovativeQuery } from "../../tina/__generated__/types";
import PersistentlyInnovative from "../../common/PersistentlyInnovative";
import { IPersistentlyInnovative } from "../../interfaces/persistentlyInnovative";
import MessageBanner from "../../common/MessageBanner";
import HowCanWeHelpComponent from "../howCanWeHelpSection";
import TechnologyDetailsComponent from "../technologyDetails";
import { IFeaturedBlogs } from "../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../interfaces/contactUs";
import ContactusBanner from "../ContactusBanner";
import FeaturedBlogsPreview from "../FeaturedBlogsPreview";
import { IInnovationAndTransformation } from "../../interfaces/IInnovationAndTransformation";

const InnovationAndTransformationPanel = (props: {
    data: IInnovationAndTransformation;
    featuredBlogs: IFeaturedBlogs;
    contactUsBanner: IContactUsBanner;
    persistentlyInnovative: IPersistentlyInnovative;
}) => {
    const { data: innovationAndTransformation } = useTina(props.data);

    const { data: featuredBlogsList } = useTina(props.featuredBlogs)
    const { data: contactUsBannerData } = useTina(props.contactUsBanner)

    const {
        heroSectionData,
        messageBannerData,
        HowCanWeHelpSection,
        Cards,
        innovationAndTransformationSection,
        innovationCards,
    } = innovationAndTransformation.innovationAndTransformation;

    const howCanWeHelpSectionData = { ...HowCanWeHelpSection, cards: Cards };
    const innovationAndTransformationSectionData = {
        ...innovationAndTransformationSection,
        cards: innovationCards,
    };
    const { data: persistentlyInnovativeData } = useTina(
        props.persistentlyInnovative
    );

    const howcanhelperpref = useRef<HTMLDivElement>(null);
    const whyuserpref = useRef<HTMLDivElement>(null);
    const overviewRef = useRef<HTMLDivElement>(null);
    const whatWeOfferRef = useRef<HTMLDivElement>(null);





    const gettouchref = useRef<HTMLDivElement>(null);


    return (
        <div>
            <ServicesHeroSection {...heroSectionData} ref={overviewRef} refLabels={[{ name: "OVERVIEW", ref: overviewRef }, { name: "WHY US", ref: howcanhelperpref }, { name: "WHAT WE OFFER", ref: whatWeOfferRef }, { name: "HOW CAN WE HELP", ref: whyuserpref }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />

            <HowCanWeHelpComponent
                {...howCanWeHelpSectionData}
                cardAlignment="left"

                ref={howcanhelperpref}
            />
            <MessageBanner {...messageBannerData} />
            <TechnologyDetailsComponent {...innovationAndTransformationSectionData} ref={whatWeOfferRef} />
            {persistentlyInnovativeData && (
                <PersistentlyInnovative
                    persistentlyInnovativeData={
                        persistentlyInnovativeData as PersistentlyInnovativeQuery
                    }
                    ref={whyuserpref}
                />


            )}
            <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0, 3)} />
            <ContactUsForm darkTheme={true} ref={gettouchref} />
            <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />


        </div>
    );
};

export default InnovationAndTransformationPanel;
