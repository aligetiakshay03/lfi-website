"use client";
import React, { useRef } from "react";
import ServicesHeroSection from "../../../common/services/heroSection";
import ProjectFlowCardSection from "../../../common/ProjectFlowCardSection/projectFlowCardSection";
import MessageBanner from "../../../common/MessageBanner";
import ContactUsForm from "../../ContactUsForm";
import { useTina } from "tinacms/dist/react";
import MediaSectionBlock from "../../../common/MediaSection";
import { IAIML } from "../../../interfaces/aiMl";
import { AiMlMediaSection, ContactusbannerQuery } from "../../../tina/__generated__/types";
import { IFeaturedBlogs } from "../../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../../interfaces/contactUs";
import FeaturedBlogsPreview from "../../FeaturedBlogsPreview";
import ContactusBanner from "../../ContactusBanner";

function AiMlPanel(props: {
  data: IAIML; featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
}) {
  const { data: aiml } = useTina(props.data);

  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)

  const {
    heroSectionData,
    growthmessage,
    aiMlCards,
    aiMlCardSection,
    MediaSection,
  } = aiml.AiMl;

  const projectFlowCardData = {
    ...aiMlCardSection,
    cards: aiMlCards,
  };

  const whatweofferserviceref = useRef<HTMLDivElement>(null);
  const ourprocessservicemediaref = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);

  const gettouchref = useRef<HTMLDivElement>(null);

  return (
    <div>
      <ServicesHeroSection {...heroSectionData} ref={overviewRef}  refLabels={[ { name: "OVERVIEW", ref: overviewRef },{ name: "HOW CAN WE HELP", ref: whatweofferserviceref }, { name: "OUR PROCESS", ref: ourprocessservicemediaref }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />

      <ProjectFlowCardSection {...projectFlowCardData} ref={whatweofferserviceref} />
      <MessageBanner {...growthmessage} />
      <MediaSectionBlock data={MediaSection as AiMlMediaSection} ref={ourprocessservicemediaref} />
      <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0, 3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />

    </div>
  );
}

export default AiMlPanel;
