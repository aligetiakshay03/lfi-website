"use client";
import React, { useRef } from "react";
import ServicesHeroSection from "../../../common/services/heroSection";
import MessageBanner from "../../../common/MessageBanner";
import ContactUsForm from "../../ContactUsForm";
import { useTina } from "tinacms/dist/react";
import HowCanWeHelp from "../../HowCanWeHelp";
import WhatWeOffer from "../../../common/WhatWeOffer";
import { ISolutionDiscovery } from "../../../interfaces/solutionsDiscovery";
import MediaSectionBlock from "../../../common/MediaSection";
import { IFeaturedBlogs } from "../../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../../interfaces/contactUs";
import FeaturedBlogsPreview from "../../FeaturedBlogsPreview";
import ContactusBanner from "../../ContactusBanner";
import { ContactusbannerQuery } from "../../../tina/__generated__/types";

function SolutionDiscoveryPanel(props: {
  data: ISolutionDiscovery;
  featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
}) {
  const { data: solutionDisoveryData } = useTina(props.data);

  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)

  const {
    heroSectionData,
    growthmessage,
    whatweoffer,
    MediaSection,
    howCanWeHelp,
    HowWeCanHelpSection,
  } = solutionDisoveryData.solutionDiscovery;
  const howCanWeHelpData = { ...HowWeCanHelpSection, helpItems: howCanWeHelp };

  const howcanhelpsserviceref = useRef<HTMLDivElement>(null);
  const whatweoffersserviceref = useRef<HTMLDivElement>(null);
  const ourprocessservicemediaref = useRef<HTMLDivElement>(null);
  const gettouchref = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);


  return (
    <div>
      <ServicesHeroSection {...heroSectionData} ref={overviewRef} refLabels={[{ name: "OVERVIEW", ref: overviewRef }, { name: "HOW CAN WE HELP", ref: howcanhelpsserviceref }, { name: "WHAT WE OFFER", ref: whatweoffersserviceref }, { name: "OUR PROCESS", ref: ourprocessservicemediaref }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />

      <HowCanWeHelp data={howCanWeHelpData} ref={howcanhelpsserviceref} />
      <MessageBanner {...growthmessage} />
      <WhatWeOffer data={whatweoffer} ref={whatweoffersserviceref} />
      {MediaSection && <MediaSectionBlock data={MediaSection} ref={ourprocessservicemediaref} />}
      <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0, 3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />


    </div>
  );
}

export default SolutionDiscoveryPanel;
