"use client";
import React, { useRef } from "react";
import ContactUsForm from "../../../ContactUsForm";
import BlogPreviewSection from "../../../BlogPreviewSection";
import CollapseComponent from "../../../../common/CollapseComponents";
import ProjectFlowCardSection from "../../../../common/ProjectFlowCardSection/projectFlowCardSection";
import MessageBanner from "../../../../common/MessageBanner";
import WhatWeOffer from "../../../../common/WhatWeOffer";
import ServicesHeroSection from "../../../../common/services/heroSection";
import { useTina } from "tinacms/dist/react";
import OurSuperPowersComponent from "../../../../common/OurSuperpowers";
import { IDevopsProps } from "../../../../interfaces/devops";
import { IBlogCollection } from "../../../../interfaces/blogs";
import { IFeaturedBlogs } from "../../../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../../../interfaces/contactUs";
import FeaturedBlogsPreview from "../../../FeaturedBlogsPreview";
import ContactusBanner from "../../../ContactusBanner";
import { ContactusbannerQuery } from "../../../../tina/__generated__/types";

const DevOpsPanel = (props: {
  data: IDevopsProps;
  blogPosts: IBlogCollection;
  featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
}) => {
  const { data: devopsData } = useTina(props.data) as any;
  const { data: blogPosts } = useTina(props.blogPosts);

  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)

  const {
    heroSectionData,
    messageBannerData,
    ProjectFlowCards,
    Cards,
    CollapseComponentData,
    whatweoffer,
    OurBenefits,
    darkAndLightComponentCards,
  } = devopsData.devOpsPage;
  const projectFlowCardData = { ...ProjectFlowCards, cards: Cards };
  const ourSuperpowersData = {
    ...OurBenefits,
    cards: darkAndLightComponentCards,
  };

  const gettouchref = useRef<HTMLDivElement>(null);
  const whatweofferserviceref = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);

  const howcanhelpserviceref = useRef<HTMLDivElement>(null);
  const oursuperpowerserviceref = useRef<HTMLDivElement>(null);
  const ourprocessservicecollapseref = useRef<HTMLDivElement>(null);

  return (
    <div>
      <ServicesHeroSection {...heroSectionData} ref={overviewRef} refLabels={[{ name: "OVERVIEW", ref: overviewRef }, { name: "HOW CAN WE HELP", ref: howcanhelpserviceref }, { name: "WHAT WE OFFER", ref: whatweofferserviceref }, { name: "OUR PROCESS", ref: ourprocessservicecollapseref }, { name: "BENEFITS", ref: oursuperpowerserviceref }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />
      <WhatWeOffer data={whatweoffer} ref={howcanhelpserviceref} />
      <MessageBanner {...messageBannerData} />
      <ProjectFlowCardSection {...projectFlowCardData} ref={whatweofferserviceref} />
      <CollapseComponent data={CollapseComponentData} ref={ourprocessservicecollapseref} />
      <OurSuperPowersComponent {...ourSuperpowersData} ref={oursuperpowerserviceref} />
      <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0, 3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />

    </div>
  );
};

export default DevOpsPanel;
