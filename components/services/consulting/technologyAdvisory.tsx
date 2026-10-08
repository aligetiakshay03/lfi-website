"use client";
import React, { useRef } from "react";
import ServicesHeroSection from "../../../common/services/heroSection";
import WhatWeOffer from "../../../common/WhatWeOffer";
import MessageBanner from "../../../common/MessageBanner";
import BlogPreviewSection from "../../BlogPreviewSection";
import  ContactUsForm  from "../../ContactUsForm";
import ProjectFlowCardSection from "../../../common/ProjectFlowCardSection/projectFlowCardSection";
import { ITechAdvisory } from "../../../interfaces/techAdvisoryInterface";
import { useTina } from "tinacms/dist/react";
import { IBlogCollection } from "../../../interfaces/blogs";
import { IFeaturedBlogs } from "../../../interfaces/IFeaturedBlogs";
import FeaturedBlogsPreview from "../../FeaturedBlogsPreview";
import ContactusBanner from "../../ContactusBanner";
import { ContactusbannerQuery } from "../../../tina/__generated__/types";
import { IContactUsBanner } from "../../../interfaces/contactUs";

function TechnologyAdvisoryPanel(props: {
  data: ITechAdvisory;
  featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
}) {
  const { data: techAdvisoryData } = useTina(props.data);

  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)

  const {
    growthmessage,
    heroSectionData,
    transformationCards,
    Projectflow,
    whatweoffer,
  } = techAdvisoryData.techAdvisory;
  const projectFlowCardData = { ...Projectflow, cards: transformationCards };

  const whatweoffersserviceref= useRef<HTMLDivElement>(null);
  const ourofferserviceref= useRef<HTMLDivElement>(null);
  const gettouchref = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <ServicesHeroSection {...heroSectionData} ref={overviewRef}  refLabels={[  { name: "OVERVIEW", ref: overviewRef },{name:"WHAT WE OFFER", ref:whatweoffersserviceref},{name:"OUR OFFERINGS", ref:ourofferserviceref} ,{name: "GET IN TOUCH", ref:gettouchref}]} contactusref ={gettouchref} />

      <WhatWeOffer data={whatweoffer} ref = {whatweoffersserviceref} />
      <MessageBanner {...growthmessage} />
      <ProjectFlowCardSection {...projectFlowCardData} ref={ourofferserviceref} />
       <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0,3)} />
      <ContactUsForm  darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery}/>


    </div>
  );
}

export default TechnologyAdvisoryPanel;
