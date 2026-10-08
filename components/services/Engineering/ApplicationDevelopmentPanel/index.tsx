"use client";
import React, { useRef } from "react";
import ServicesHeroSection from "../../../../common/services/heroSection";
import MediaSectionBlock from "../../../../common/MediaSection";
import BlogPreviewSection from "../../../BlogPreviewSection";
import ContactUsForm from "../../../ContactUsForm";
import ProjectFlowCardSection from "../../../../common/ProjectFlowCardSection/projectFlowCardSection";
import { useTina } from "tinacms/dist/react";
import OurSuperPowersComponent from "../../../../common/OurSuperpowers";
import { IApplicationDevelopment } from "../../../../interfaces/applicationDevelopment";
import { IBlogCollection } from "../../../../interfaces/blogs";
import MessageBannerSection from "../../../MessageBannerSection";
import MessageBanner from "../../../../common/MessageBanner";
import { IFeaturedBlogs } from "../../../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../../../interfaces/contactUs";
import FeaturedBlogsPreview from "../../../FeaturedBlogsPreview";
import ContactusBanner from "../../../ContactusBanner";
import { ContactusbannerQuery } from "../../../../tina/__generated__/types";

const ApplicationDevelopmentPanel = (props: {
  data: IApplicationDevelopment;
  featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
}) => {
  const { data: applicationDevelopmentData } = useTina(props.data) as any;
  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)
  const {
    heroSectionData,
    MediaSection,
    Projectflow,
    Cards,
    OurSuperPowers,
    darkAndLightComponentCards,
    growthMessage,
  } = applicationDevelopmentData.applicationDevelopment;
  const projectFlowCardData = { ...Projectflow, cards: Cards };
  const ourSuperpowersData = {
    ...OurSuperPowers,
    cards: darkAndLightComponentCards,
  };

  const whatweofferserviceref = useRef<HTMLDivElement>(null);
  const gettouchref = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);

  const ourprocessservicemediaref = useRef<HTMLDivElement>(null);
  const oursuperpowerserviceref = useRef<HTMLDivElement>(null);

  return (
    <div>
      <ServicesHeroSection {...heroSectionData} ref={overviewRef}
        refLabels={[{ name: "OVERVIEW", ref: overviewRef }, { name: "WHAT WE OFFER", ref: whatweofferserviceref }, { name: "OUR PROCESS", ref: ourprocessservicemediaref }, { name: "OUR SUPERPOWERS", ref: oursuperpowerserviceref }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />
      <ProjectFlowCardSection {...projectFlowCardData} ref={whatweofferserviceref} />
      <MessageBanner {...growthMessage} />
      {MediaSection && <MediaSectionBlock data={MediaSection} ref={ourprocessservicemediaref} />}
      <OurSuperPowersComponent {...ourSuperpowersData} ref={oursuperpowerserviceref} />
      <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0, 3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />

    </div>
  );
};

export default ApplicationDevelopmentPanel;
