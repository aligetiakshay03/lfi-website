"use client";
import React, { useRef } from "react";
import ServicesHeroSection from "../../../common/services/heroSection";
import ProjectFlowCardSection from "../../../common/ProjectFlowCardSection/projectFlowCardSection";
import MessageBanner from "../../../common/MessageBanner";
import BlogPreviewSection from "../../BlogPreviewSection";
import ContactUsForm from "../../ContactUsForm";
import { useTina } from "tinacms/dist/react";
import { IStaffAugmentation } from "../../../interfaces/staffAugmentation";
import MediaSectionBlock from "../../../common/MediaSection";
import OurOffering from "../../OurOfferings";
import { IConstantlyInnovating } from "../../../interfaces/constantlyInnovating";
import {
  ConstantlyInnovatingImageBlock,
  ContactusbannerQuery,
  StaffAugmentationPerformingLanguages,
  StaffAugmentationPlatforms,
} from "../../../tina/__generated__/types";
import { IFeaturedBlogs } from "../../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../../interfaces/contactUs";
import FeaturedBlogsPreview from "../../FeaturedBlogsPreview";
import ContactusBanner from "../../ContactusBanner";

function StaffAugmentationPanel(props: {
  data: IStaffAugmentation;
  featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
  constantlyInnovating: IConstantlyInnovating;
}) {
  const { data: staffAugmentationData } = useTina(props.data);

  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)
  const { data: constantlyInnovatingData } = useTina(
    props.constantlyInnovating
  );

  const {
    heroSectionData,
    staffAugmentationSection,
    staffAugmentationCards,
    growthmessage,
    MediaSection,
    platforms,
    performingLanguages,
  } = staffAugmentationData.staffAugmentation;

  const staffAugmentationCardData = {
    ...staffAugmentationSection,
    cards: staffAugmentationCards,
  };

  const { imageBlock } = constantlyInnovatingData?.constantlyInnovating;
  const howcanhelpprojectserviceref = useRef<HTMLDivElement>(null);
  const ourprocessservicemediaref = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);

  const gettouchref = useRef<HTMLDivElement>(null);

  return (
    <div>
      <ServicesHeroSection {...heroSectionData} ref={overviewRef} refLabels={[ { name: "OVERVIEW", ref: overviewRef },{ name: "HOW CAN WE HELP", ref: howcanhelpprojectserviceref }, { name: "OUR PROCESS", ref: ourprocessservicemediaref }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />

      <ProjectFlowCardSection {...staffAugmentationCardData} ref={howcanhelpprojectserviceref} />
      <MessageBanner {...growthmessage} />
      {MediaSection && <MediaSectionBlock data={MediaSection} ref={ourprocessservicemediaref} />}
      <OurOffering
        platforms={platforms as StaffAugmentationPlatforms}
        performingLanguages={
          performingLanguages as StaffAugmentationPerformingLanguages
        }
        imageBlock={imageBlock as ConstantlyInnovatingImageBlock[]}


      />
      <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0, 3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />


    </div>
  );
}

export default StaffAugmentationPanel;
