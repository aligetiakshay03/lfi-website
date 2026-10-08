"use client";
import React, { useRef } from "react";
import ServicesHeroSection from "../../../../common/services/heroSection";
import CollapseComponent from "../../../../common/CollapseComponents";
import BlogPreviewSection from "../../../BlogPreviewSection";
import MediaSectionBlock from "../../../../common/MediaSection";
import ProjectFlowCardSection from "../../../../common/ProjectFlowCardSection/projectFlowCardSection";
import ContactUsForm from "../../../ContactUsForm";
import { useTina } from "tinacms/dist/react";
import OurSuperPowersComponent from "../../../../common/OurSuperpowers";
import { IQualityControl } from "../../../../interfaces/qualityControl";
import { IBlogCollection } from "../../../../interfaces/blogs";
import { IFeaturedBlogs } from "../../../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../../../interfaces/contactUs";
import FeaturedBlogsPreview from "../../../FeaturedBlogsPreview";
import ContactusBanner from "../../../ContactusBanner";
import { ContactusbannerQuery } from "../../../../tina/__generated__/types";
import MessageBanner from "../../../../common/MessageBanner";


const QualityControlPanel = (props: {
  data: IQualityControl;
  blogPosts: IBlogCollection;
  featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
}) => {
  const { data: qualityControlData } = useTina(props.data) as any;
  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)

  const {
    heroSectionData,
    messageBannerData,
    MediaSection,
    ProjectFlowCards,
    Cards,
    CollapseComponentData,
    Benefits,
    darkAndLightComponentCards,
  } = qualityControlData.qualityControl;
  const projectFlowCardData = { ...ProjectFlowCards, cards: Cards };
  const ourSuperpowersData = {
    ...Benefits,
    cards: darkAndLightComponentCards,
  };

 

  const whatweofferserviceref = useRef<HTMLDivElement>(null);
  const gettouchref = useRef<HTMLDivElement>(null);

  const oursuperpowerserviceref = useRef<HTMLDivElement>(null);
  const ourprocessservicemediaref = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);



  return (
    <div>
      <ServicesHeroSection {...heroSectionData}  ref={overviewRef} refLabels={[ { name: "OVERVIEW", ref: overviewRef },{ name: "WHAT WE OFFER", ref: whatweofferserviceref }, { name: "OUR PROCESS", ref: ourprocessservicemediaref }, { name: "BENIFITS", ref: oursuperpowerserviceref }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />
      <ProjectFlowCardSection {...projectFlowCardData} ref={whatweofferserviceref} />
      <MessageBanner {...messageBannerData} />


      <MediaSectionBlock data={MediaSection} ref={ourprocessservicemediaref} />
      <CollapseComponent data={CollapseComponentData} />
      <OurSuperPowersComponent {...ourSuperpowersData} ref={oursuperpowerserviceref} />
      <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0, 3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />


    </div>
  );
};

export default QualityControlPanel;
