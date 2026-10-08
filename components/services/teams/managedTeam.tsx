"use client";
import React, { useRef } from "react";
import ServicesHeroSection from "../../../common/services/heroSection";
import ProjectFlowCardSection from "../../../common/ProjectFlowCardSection/projectFlowCardSection";
import MessageBanner from "../../../common/MessageBanner";
import CollapseComponent from "../../../common/CollapseComponents";
import BlogPreviewSection from "../../BlogPreviewSection";
import  ContactUsForm  from "../../ContactUsForm";
import { useTina } from "tinacms/dist/react";
import { IManagedTeam } from "../../../interfaces/managedTeam";
import { IBlogCollection } from "../../../interfaces/blogs";
import { IFeaturedBlogs } from "../../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../../interfaces/contactUs";
import FeaturedBlogsPreview from "../../FeaturedBlogsPreview";
import ContactusBanner from "../../ContactusBanner";
import { ContactusbannerQuery } from "../../../tina/__generated__/types";

function ManagedTeamPanel(props: {
  data: IManagedTeam;
  featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
}) {
  const { data: managedTeamsData } = useTina(props.data);
 
  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)

  const {
    heroSectionData,
    transformationCards,
    bringingBest,
    growthmessage,
    CollapseComponentData,
  } = managedTeamsData.managedTeam;
  const projectFlowCardData = { ...bringingBest, cards: transformationCards };

  const howcanhelpprojectserviceref = useRef<HTMLDivElement>(null);
  const ourprocessservicecollapseref = useRef<HTMLDivElement>(null);
  const gettouchref = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <ServicesHeroSection {...heroSectionData} ref={overviewRef}  refLabels={[ { name: "OVERVIEW", ref: overviewRef }, {name:"HOW CAN WE HELP", ref:howcanhelpprojectserviceref} ,{name:"OUR PROCESS", ref:ourprocessservicecollapseref} ,{name: "GET IN TOUCH", ref:gettouchref}]} contactusref ={gettouchref} />

      <ProjectFlowCardSection {...projectFlowCardData} ref={howcanhelpprojectserviceref}  />
      <MessageBanner {...growthmessage} />
      <CollapseComponent data={CollapseComponentData}  ref ={ourprocessservicecollapseref}/>
       <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0,3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />


    </div>
  );
}

export default ManagedTeamPanel;
