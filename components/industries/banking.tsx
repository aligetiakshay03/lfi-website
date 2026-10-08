"use client";
import React, { useRef } from "react";
import { IBankingProps } from "../../interfaces/banking";
import { useTina } from "tinacms/dist/react";
import ServicesHeroSection from "../../common/services/heroSection";
import ContactUsForm from "../ContactUsForm";
import { BankingSpecializationList, ContactusbannerQuery } from "../../tina/__generated__/types";
import BuildingToolsComponent from "../../common/BuildingTools";
import { IBuildingsToolsProps } from "../../interfaces/buildingsTools";
import MessageBanner from "../../common/MessageBanner";
import { IFeaturedBlogs } from "../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../interfaces/contactUs";
import ContactusBanner from "../ContactusBanner";
import FeaturedBlogsPreview from "../FeaturedBlogsPreview";
import OurSpecialization from "../../common/SpecializationList";

const BankingPanel = (props: {
  data: IBankingProps;
  featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
  buildingsTools: IBuildingsToolsProps;
}) => {
  const { data: bankingData } = useTina(props.data);

  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)
  const { data: BuildingTools } = useTina(props.buildingsTools);

  const { heroSectionData, specializationList, BuildingToolsSection, leadersMessageBanner } =
    bankingData.banking;
  const buildingsToolsData = { ...BuildingToolsSection, cards: BuildingTools };

  const gettouchref = useRef<HTMLDivElement>(null);

  const whatweofferindustriesref = useRef<HTMLDivElement>(null);
  const OurSpecializationindustriesref = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);





  return (
    <div>
      <ServicesHeroSection {...heroSectionData} ref={overviewRef} refLabels={[{ name: "INDUSTRY OVERVIEW", ref: overviewRef }, { name: "WHAT WE OFFER", ref: whatweofferindustriesref }, { name: "OUR SPECIALIZATION", ref: OurSpecializationindustriesref }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />
      <BuildingToolsComponent {...buildingsToolsData} ref={whatweofferindustriesref} />
      <MessageBanner {...leadersMessageBanner} />
      <OurSpecialization
        {...(specializationList as BankingSpecializationList)} ref={OurSpecializationindustriesref}
      />
      <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0, 3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />


    </div>
  );
};

export default BankingPanel;
