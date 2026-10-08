"use client";
import React, { useRef } from "react";
import ServicesHeroSection from "../../../common/services/heroSection";
import BlogPreviewSection from "../../BlogPreviewSection";
import ContactUsForm from "../../ContactUsForm";
import MessageBanner from "../../../common/MessageBanner";
import ProjectFlowCardSection from "../../../common/ProjectFlowCardSection/projectFlowCardSection";
import { useTina } from "tinacms/dist/react";
import { IDigitalTransformation } from "../../../interfaces/digitalTransformation";
import MediaSectionBlock from "../../../common/MediaSection";
import DigitalEvolutionSection from "../../../common/DigitalEvolutionMediaSection";
import { IBlogCollection } from "../../../interfaces/blogs";
import { IFeaturedBlogs } from "../../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../../interfaces/contactUs";
import FeaturedBlogsPreview from "../../FeaturedBlogsPreview";
import ContactusBanner from "../../ContactusBanner";
import { ContactusbannerQuery } from "../../../tina/__generated__/types";

function DigitalTransformationPanel(props: {
  data: IDigitalTransformation;
  blogPosts: IBlogCollection;
  featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
}) {
  const { data: transformedData } = useTina(props.data);
  const { data: blogPosts } = useTina(props.blogPosts);
  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)

  const {
    heroSectionData,
    messageBannerData,
    Cards,
    Projectflow,
    MediaSection,
    digitalEvolutionMediaSection,
    UseCases,
    UseCasesCards,
  } = transformedData.digitalTransformation;

  const projectFlowCardData = { ...Projectflow, cards: Cards };
  const UseCasesData = { ...UseCases, cards: UseCasesCards };

  const howcanweserviceref = useRef<HTMLDivElement>(null);
  const gettouchref = useRef<HTMLDivElement>(null);
  const ourprocessservicemediaref = useRef<HTMLDivElement>(null);
  const ourprocessdigitalserviceref = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);

  const usecaserviceref = useRef<HTMLDivElement>(null);
  
  return (
    <div>
      <ServicesHeroSection {...heroSectionData} ref={overviewRef} refLabels={[{ name: "OVERVIEW", ref: overviewRef }, { name: "HOW CAN WE HELP", ref: howcanweserviceref }, { name: "COVID 19", ref: ourprocessservicemediaref }, { name: "OUR PROCESS", ref: ourprocessdigitalserviceref }, { name: "USE CASES", ref: usecaserviceref }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />
      <ProjectFlowCardSection {...projectFlowCardData} ref={howcanweserviceref} />
      {MediaSection && <MediaSectionBlock data={MediaSection} ref={ourprocessservicemediaref} />}
      <MessageBanner {...messageBannerData} />
      {digitalEvolutionMediaSection && (
        <DigitalEvolutionSection data={digitalEvolutionMediaSection} ref={ourprocessdigitalserviceref} />
      )}
      <ProjectFlowCardSection {...UseCasesData} ref={usecaserviceref} />
      <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0, 3)} />
      <ContactUsForm ref={gettouchref} darkTheme={true} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />


    </div>
  );
}

export default DigitalTransformationPanel;
