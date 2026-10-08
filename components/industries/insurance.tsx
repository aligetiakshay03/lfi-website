"use client";
import React, { useRef } from "react";
import { IBlogCollection } from "../../interfaces/blogs";
import { useTina } from "tinacms/dist/react";
import ServicesHeroSection from "../../common/services/heroSection";
import BlogPreviewSection from "../BlogPreviewSection";
import ContactUsForm from "../ContactUsForm";
import { IInsuranceProps } from "../../interfaces/insurance";
import OurSpecialization from "../../common/SpecializationList";
import { ContactusbannerQuery, InsuranceSpecializationList } from "../../tina/__generated__/types";
import { IBuildingsToolsProps } from "../../interfaces/buildingsTools";
import BuildingToolsComponent from "../../common/BuildingTools";
import MessageBanner from "../../common/MessageBanner";
import { IFeaturedBlogs } from "../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../interfaces/contactUs";
import ContactusBanner from "../ContactusBanner";
import FeaturedBlogsPreview from "../FeaturedBlogsPreview";

const InsurancePanel = (props: {
  data: IInsuranceProps;
  featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
  buildingsTools: IBuildingsToolsProps;
}) => {
  const { data: insuranceData } = useTina(props.data);

  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)
  const { data: BuildingTools } = useTina(props.buildingsTools);

  const { heroSectionData, specializationList, BuildingToolsSection, leadersMessageBanner } =
    insuranceData.insurance;
  const buildingsToolsData = { ...BuildingToolsSection, cards: BuildingTools };

  const gettouchref = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);


  const whatweofferindustriesref = useRef<HTMLDivElement>(null);
  const OurSpecializationindustriesref = useRef<HTMLDivElement>(null);


  return (
    <div>

      <ServicesHeroSection {...heroSectionData} ref={overviewRef}  refLabels={[ { name: "INDUSTRY OVERVIEW", ref: overviewRef },{ name: "WHAT WE OFFER", ref: whatweofferindustriesref }, { name: "OUR SPECIALIZATION", ref: OurSpecializationindustriesref }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />

      <BuildingToolsComponent {...buildingsToolsData} ref={whatweofferindustriesref} /> \
      <MessageBanner {...leadersMessageBanner} />
      <OurSpecialization
        {...(specializationList as InsuranceSpecializationList)} ref={OurSpecializationindustriesref}
      />
       <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0,3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />


    </div>
  );
};

export default InsurancePanel;
