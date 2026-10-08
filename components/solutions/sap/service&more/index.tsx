"use client";
import React, { useRef } from "react";
import { useTina } from "tinacms/dist/react";
import ContactUsForm from "../../../ContactUsForm";
import ServicesHeroSection from "../../../../common/services/heroSection";
import HowCanWeHelpComponent from "../../../howCanWeHelpSection";
import { IServiceAndMoreProps } from "../../../../interfaces/service&more";
import MarketingAndPromotionsSection from "../../../MarketingAndPromotions";
import CoreServicesComponent from "../../../CoreServices";
import { IFeaturedBlogs } from "../../../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../../../interfaces/contactUs";
import { ContactusbannerQuery } from "../../../../tina/__generated__/types";
import ContactusBanner from "../../../ContactusBanner";
import FeaturedBlogsPreview from "../../../FeaturedBlogsPreview";
const ServiceAndMorePanel = (props: {
  data: IServiceAndMoreProps;
  featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
}) => {
  const { data: serviceAndMoreData } = useTina(props.data);
  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)
  const {
    heroSectionData,
    Cards,
    S_4_Hana,
    coreServices,
    coreServicesCards,
    differentiators,
    differentiatorsCards,
    marketingAndPromotionsContent,
    marketingAndPromotionsHeading,
  } = serviceAndMoreData.serviceAndMore;
  const howCanWeHelpSectionData = { ...S_4_Hana, cards: Cards };
  const marketingAndPromotionsData = {
    ...marketingAndPromotionsHeading,
    content: marketingAndPromotionsContent,
  };
  const differentiatorsData = {
    ...differentiators,
    cards: differentiatorsCards,
  };
  const coreServicesData = {
    ...coreServices,
    cards: coreServicesCards,
  };
  const howcanhelperpref = useRef<HTMLDivElement>(null);
  const marketingref = useRef<HTMLDivElement>(null);
  const gettouchref = useRef<HTMLDivElement>(null);
  return (
    <div>
      <ServicesHeroSection {...heroSectionData} hideComponent refLabels={[{ name: "SAP TECHNICAL COMPLEXITIES", ref: howcanhelperpref }, { name: "MARKETING AND PROMOTIONS", ref: marketingref }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />
      <HowCanWeHelpComponent
        {...howCanWeHelpSectionData}
        cardAlignment="left" ref={howcanhelperpref}
      />
      <MarketingAndPromotionsSection {...marketingAndPromotionsData} ref={marketingref} />
      <CoreServicesComponent {...differentiatorsData} />
      <CoreServicesComponent {...coreServicesData} />
      <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0, 3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />
    </div>
  );
};
export default ServiceAndMorePanel;
