"use client";
import React, { useRef } from "react";
import ServicesHeroSection from "../../../common/services/heroSection";
import ProjectFlowCardSection from "../../../common/ProjectFlowCardSection/projectFlowCardSection";
import MessageBanner from "../../../common/MessageBanner";
import BlogPreviewSection from "../../BlogPreviewSection";
import  ContactUsForm  from "../../ContactUsForm";
import { useTina } from "tinacms/dist/react";
import { IIPaaS } from "../../../interfaces/iPaaS";
import { IBlogCollection } from "../../../interfaces/blogs";
import { IFeaturedBlogs } from "../../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../../interfaces/contactUs";
import FeaturedBlogsPreview from "../../FeaturedBlogsPreview";
import ContactusBanner from "../../ContactusBanner";
import { ContactusbannerQuery } from "../../../tina/__generated__/types";

function IPaasPanel(props: { data: IIPaaS; featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner; }) {
  const { data: iPaaSData } = useTina(props.data);

  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)
  const {
    heroSectionData,
    growthmessage,
    buildingSection,
    buildingCards,
    achievementSection,
    achievementCards,
  } = iPaaSData.iPaaS;

  const buildingSectionData = { ...buildingSection, cards: buildingCards };
  const achievementSectionData = {
    ...achievementSection,
    cards: achievementCards,
  };

  const whatweofferserviceref= useRef< HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);

  const gettouchref = useRef<HTMLDivElement>(null);
  const ourprocessprojectserviceref = useRef<HTMLDivElement>(null);

  return (
    <div>
      <ServicesHeroSection {...heroSectionData} ref={overviewRef} refLabels={[ { name: "OVERVIEW", ref: overviewRef }, {name:"WHAT WE OFFER", ref:whatweofferserviceref} ,{name:"OUR PROCESS", ref:ourprocessprojectserviceref} ,{name: "GET IN TOUCH", ref:gettouchref}]} contactusref ={gettouchref} />

      <ProjectFlowCardSection {...achievementSectionData} ref={whatweofferserviceref}  />
      <MessageBanner {...growthmessage} />
      <ProjectFlowCardSection {...buildingSectionData} ref={ourprocessprojectserviceref}/>
       <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0,3)} />
      <ContactUsForm  darkTheme={true} ref={gettouchref}/>
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />


    </div>
  );
}

export default IPaasPanel;
