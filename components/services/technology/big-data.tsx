"use client";
import React, { useRef } from "react";
import ServicesHeroSection from "../../../common/services/heroSection";
import ProjectFlowCardSection from "../../../common/ProjectFlowCardSection/projectFlowCardSection";
import MessageBanner from "../../../common/MessageBanner";
import BlogPreviewSection from "../../BlogPreviewSection";
import ContactUsForm from "../../ContactUsForm";
import { useTina } from "tinacms/dist/react";
import { IBigData } from "../../../interfaces/bigData";
import MediaSectionBlock from "../../../common/MediaSection";
import { IContactUsBanner } from "../../../interfaces/contactUs";
import { IFeaturedBlogs } from "../../../interfaces/IFeaturedBlogs";
import FeaturedBlogsPreview from "../../FeaturedBlogsPreview";
import ContactusBanner from "../../ContactusBanner";
import { ContactusbannerQuery } from "../../../tina/__generated__/types";

function BigDataPanel(props: {
  data: IBigData; featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
}) {
  const { data: bigData } = useTina(props.data);

  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)

  const {
    heroSectionData,
    bigDataCardSection,
    bigDataCards,
    growthmessage,
    MediaSection,
  } = bigData.bigData;
  const projectFlowCardData = { ...bigDataCardSection, cards: bigDataCards };

  const whatweofferserviceref = useRef<HTMLDivElement>(null);
  const ourprocessservicemediaref = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);

  const gettouchref = useRef<HTMLDivElement>(null);

  return (
    <div>
      <ServicesHeroSection {...heroSectionData} ref={overviewRef}  refLabels={[ { name: "OVERVIEW", ref: overviewRef },{ name: "HOW CAN WE HELP", ref: whatweofferserviceref }, { name: "OUR PROCESS", ref: ourprocessservicemediaref }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />

      <ProjectFlowCardSection {...projectFlowCardData} ref={whatweofferserviceref} />
      <MessageBanner {...growthmessage} />
      {MediaSection && <MediaSectionBlock data={MediaSection} ref={ourprocessservicemediaref} />}
       <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0,3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery}  />


    </div>
  );
}

export default BigDataPanel;
