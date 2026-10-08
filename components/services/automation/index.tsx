"use client";
import React, { useRef } from "react";
import ServicesHeroSection from "../../../common/services/heroSection";
import MessageBanner from "../../../common/MessageBanner";
import BlogPreviewSection from "../../BlogPreviewSection";
import ContactUsForm from "../../ContactUsForm";
import ProjectFlowCardSection from "../../../common/ProjectFlowCardSection/projectFlowCardSection";
import { useTina } from "tinacms/dist/react";
import { IRpaProps } from "../../../interfaces/rpa";
import MediaSectionBlock from "../../../common/MediaSection";
import { IBlogCollection } from "../../../interfaces/blogs";
import OurSuperPowersComponent from "../../../common/OurSuperpowers";
import FeaturedBlogsPreview from "../../FeaturedBlogsPreview";
import ContactusBanner from "../../ContactusBanner";
import { IFeaturedBlogs } from "../../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../../interfaces/contactUs";
import { ContactusbannerQuery } from "../../../tina/__generated__/types";
import RPAFlowCardSection from "../../../common/ProjectFlowCardSection/rpaflowCards";

function RoboticProcessAutomationPanel(props: {
  data: IRpaProps;
  blogPosts: IBlogCollection;
  featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
}) {
  const { data: rpaData } = useTina(props.data);
  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)


  const {
    heroSectionData,
    messageBannerData,
    Cards,
    Projectflow,
    breakthrough,
    breakThroughCards,
    benefits,
    darkAndLightComponentCards,
    MediaSection,
  } = rpaData.roboticProcessAutomation;

  const projectFlowCardData = { ...Projectflow, cards: Cards };
  const breakthroughsCardData = { ...breakthrough, cards: breakThroughCards };
  const ourSuperpowersData = {
    ...benefits,
    cards: darkAndLightComponentCards,
  };

  const howcanweserviceref = useRef<HTMLDivElement>(null);
  const ourprocessservicemediaref = useRef<HTMLDivElement>(null);
  const gettouchref = useRef<HTMLDivElement>(null);
  const usecaserviceref = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);

  const oursuperpowerserviceref = useRef<HTMLDivElement>(null);

  return (
    <div>
      <ServicesHeroSection {...heroSectionData} ref={overviewRef} refLabels={[{ name: "OVERVIEW", ref: overviewRef }, { name: "HOW CAN WE HELP", ref: howcanweserviceref }, { name: "OUR PROCESS", ref: ourprocessservicemediaref }, { name: "BENEFITS", ref: oursuperpowerserviceref }, { name: "USE CASES", ref: usecaserviceref }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />
      <ProjectFlowCardSection {...projectFlowCardData} ref={howcanweserviceref} />
      <MessageBanner {...messageBannerData} />
      {MediaSection && <MediaSectionBlock data={MediaSection} ref={ourprocessservicemediaref} />}
      <OurSuperPowersComponent {...ourSuperpowersData} ref={oursuperpowerserviceref} />
      <RPAFlowCardSection {...breakthroughsCardData} ref={usecaserviceref} />
      <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0, 3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />

    </div>
  );
}

export default RoboticProcessAutomationPanel;
