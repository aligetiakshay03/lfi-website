"use client";
import React, { useRef } from "react";
import ServicesHeroSection from "../../../common/services/heroSection";
import ProjectFlowCardSection from "../../../common/ProjectFlowCardSection/projectFlowCardSection";
import MessageBanner from "../../../common/MessageBanner";
import BlogPreviewSection from "../../BlogPreviewSection";
import ContactUsForm from "../../ContactUsForm";
import { IKubernetesProps } from "../../../interfaces/kubernetesInterface";
import { useTina } from "tinacms/dist/react";
import MediaSectionBlock from "../../../common/MediaSection";
import { IBlogCollection } from "../../../interfaces/blogs";
import { IFeaturedBlogs } from "../../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../../interfaces/contactUs";
import FeaturedBlogsPreview from "../../FeaturedBlogsPreview";
import ContactusBanner from "../../ContactusBanner";
import { ContactusbannerQuery } from "../../../tina/__generated__/types";

function KubernetesServicesPanel(props: {
  data: IKubernetesProps;
  blogPosts: IBlogCollection;
  featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
}) {
  const { data: kubernetesData } = useTina(props.data);

  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)

  const {
    heroSectionData,
    growthmessage,
    kubernetesCards,
    kubernetesCardsSection,
    MediaSection,
  } = kubernetesData.kubernetesServices;

  const projectFlowCardData = {
    ...kubernetesCardsSection,
    cards: kubernetesCards,
  };

  const howcanhelpprojectserviceref = useRef<HTMLDivElement>(null);
  const ourprocessservicemediaref = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);

  const gettouchref = useRef<HTMLDivElement>(null);

  return (
    <div>
      <ServicesHeroSection {...heroSectionData} ref={overviewRef} refLabels={[ { name: "OVERVIEW", ref: overviewRef }, { name: "HOW CAN WE HELP", ref: howcanhelpprojectserviceref }, { name: "OUR PROCESS", ref: ourprocessservicemediaref }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />

      <ProjectFlowCardSection {...projectFlowCardData} ref={howcanhelpprojectserviceref} />
      <MessageBanner {...growthmessage} />
      {MediaSection && <MediaSectionBlock data={MediaSection} ref={ourprocessservicemediaref} />}
      <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0, 3)} />
      <ContactUsForm ref={gettouchref} darkTheme={true} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />


    </div>
  );
}

export default KubernetesServicesPanel;
