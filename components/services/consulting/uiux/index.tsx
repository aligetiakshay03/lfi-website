"use client";
import React, { useRef } from "react";
import ContactUsForm from "../../../../components/ContactUsForm";
import MessageBanner from "../../../../common/MessageBanner";
import ProjectFlowCard from "../../../../common/ProjectFlowCardSection/projectFlowCardSection";
import CollapseComponent from "../../../../common/CollapseComponents";
import ServicesHeroSection from "../../../../common/services/heroSection";
import { useTina } from "tinacms/dist/react";
import BlogPreviewSection from "../../../BlogPreviewSection";
import { IUiUx } from "../../../../interfaces/uiuxprops";
import { IBlogCollection } from "../../../../interfaces/blogs";
import { IFeaturedBlogs } from "../../../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../../../interfaces/contactUs";
import FeaturedBlogsPreview from "../../../FeaturedBlogsPreview";
import ContactusBanner from "../../../ContactusBanner";
import { ContactusbannerQuery } from "../../../../tina/__generated__/types";

function UIUXComponent(props: {
  data: IUiUx; featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
}) {
  const { data: uiuxdata } = useTina(props.data);

  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)

  const {
    messageBannerData,
    heroSectionData,
    Cards,
    Projectflow,
    CollapseComponentData,
  } = uiuxdata.uiux;

  const projectFlowCardData = { ...Projectflow, cards: Cards };

  const whatweofferserviceref = useRef<HTMLDivElement>(null);
  const ourprocessservicecollapseref = useRef<HTMLDivElement>(null);
  const gettouchref = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <ServicesHeroSection {...heroSectionData} ref={overviewRef} refLabels={[{ name: "OVERVIEW", ref: overviewRef }, { name: "WHAT WE OFFER", ref: whatweofferserviceref }, { name: "OUR PROCESS", ref: ourprocessservicecollapseref }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />

      <ProjectFlowCard {...projectFlowCardData} ref={whatweofferserviceref} />
      <MessageBanner {...messageBannerData} />
      <CollapseComponent data={CollapseComponentData} ref={ourprocessservicecollapseref} />
      <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0, 3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />


    </div>
  );
}

export default UIUXComponent;
