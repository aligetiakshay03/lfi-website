"use client";
import React, { useRef } from "react";
import ServicesHeroSection from "../../../common/services/heroSection";
import BlogPreviewSection from "../../BlogPreviewSection";
import  ContactUsForm  from "../../ContactUsForm";
import { IBlogCollection } from "../../../interfaces/blogs";
import { useTina } from "tinacms/dist/react";
import { ContactusbannerQuery, PersistentlyInnovativeQuery } from "../../../tina/__generated__/types";
import PersistentlyInnovative from "../../../common/PersistentlyInnovative";
import { IPersistentlyInnovative } from "../../../interfaces/persistentlyInnovative";
import MessageBanner from "../../../common/MessageBanner";
import { IMicrosoftDynamicsProps } from "../../../interfaces/microsoftDynamics";
import HowCanWeHelpComponent from "../../howCanWeHelpSection";
import TechnologyDetailsComponent from "../../technologyDetails";
import { IFeaturedBlogs } from "../../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../../interfaces/contactUs";
import ContactusBanner from "../../ContactusBanner";
import FeaturedBlogsPreview from "../../FeaturedBlogsPreview";
const MicrosoftDynamicsPanel = (props: {
  data: IMicrosoftDynamicsProps;
  featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
  persistentlyInnovative: IPersistentlyInnovative;
}) => {
  const { data: microsoftDynamicsData } = useTina(props.data);
  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)
  const {
    heroSectionData,
    messageBannerData,
    HowCanWeHelpSection,
    Cards,
    dynamics365Section,
    dynamics365Cards,
  } = microsoftDynamicsData.microsoftDynamics;
  const howCanWeHelpSectionData = { ...HowCanWeHelpSection, cards: Cards };
  const dynamics365SectionData = {
    ...dynamics365Section,
    cards: dynamics365Cards,
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
      <ServicesHeroSection {...heroSectionData} ref={overviewRef} refLabels={[{ name: "OVERVIEW", ref: overviewRef }, {name:"HOW CAN WE HELP", ref:howcanhelperpref}, { name: "WHAT WE OFFER", ref: whatWeOfferRef },{name:"WHY US", ref:whyuserpref},{name: "GET IN TOUCH", ref:gettouchref}]} contactusref ={gettouchref} />
      <HowCanWeHelpComponent
        {...howCanWeHelpSectionData}
        cardAlignment="left"
        ref ={howcanhelperpref}
      />
      <MessageBanner {...messageBannerData} />
      <TechnologyDetailsComponent {...dynamics365SectionData} ref={whatWeOfferRef} />
      {persistentlyInnovativeData && (
        <PersistentlyInnovative
          persistentlyInnovativeData={
            persistentlyInnovativeData as PersistentlyInnovativeQuery
          }
          ref={whyuserpref}
        />
      )}
      <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0,3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />
    </div>
  );
};
export default MicrosoftDynamicsPanel;
