"use client";
import React, { useRef } from "react";
import { IBlogCollection } from "../../interfaces/blogs";
import { useTina } from "tinacms/dist/react";
import ServicesHeroSection from "../../common/services/heroSection";
import BlogPreviewSection from "../BlogPreviewSection";
import ContactUsForm from "../ContactUsForm";
import OurSpecialization from "../../common/SpecializationList";
import { ContactusbannerQuery, OilandgasSpecializationList } from "../../tina/__generated__/types";
import { IBuildingsToolsProps } from "../../interfaces/buildingsTools";
import { IOilandgasProps } from "../../interfaces/OilandgasProps";
import MessageBanner from "../../common/MessageBanner";
import { IFeaturedBlogs } from "../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../interfaces/contactUs";
import ContactusBanner from "../ContactusBanner";
import FeaturedBlogsPreview from "../FeaturedBlogsPreview";

const OilAndGasPanel = (props: {
  data: IOilandgasProps;
  featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
  buildingsTools: IBuildingsToolsProps;
}) => {
  const { data: oilData } = useTina(props.data);

  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)
  const { heroSectionData, specializationList, BuildingToolsSection, leadersMessageBanner } = oilData.oilandgas;

  const gettouchref = useRef<HTMLDivElement>(null);

  const whatweofferindustriesref = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);

  const OurSpecializationindustriesref = useRef<HTMLDivElement>(null);


  return (
    <div>
      <ServicesHeroSection {...heroSectionData}ref={overviewRef}  refLabels={[ { name: "INDUSTRY OVERVIEW", ref: overviewRef }, { name: "OUR SPECIALIZATION", ref: OurSpecializationindustriesref }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />

      <MessageBanner {...leadersMessageBanner} />
      <OurSpecialization
        {...specializationList as OilandgasSpecializationList} ref={OurSpecializationindustriesref}
      />
       <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0,3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />


    </div>
  );
};

export default OilAndGasPanel;