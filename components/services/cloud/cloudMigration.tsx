"use client";
import React, { useRef } from "react";
import ServicesHeroSection from "../../../common/services/heroSection";
import BlogPreviewSection from "../../BlogPreviewSection";
import WhatWeOffer from "../../../common/WhatWeOffer";
import MessageBanner from "../../../common/MessageBanner";
import CollapseComponent from "../../../common/CollapseComponents";
import ContactUsForm from "../../ContactUsForm";
import { ICloudMigrationProps } from "../../../interfaces/cloudMigrationInterface";
import { useTina } from "tinacms/dist/react";
import { IFeaturedBlogs } from "../../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../../interfaces/contactUs";
import FeaturedBlogsPreview from "../../FeaturedBlogsPreview";
import ContactusBanner from "../../ContactusBanner";
import { ContactusbannerQuery } from "../../../tina/__generated__/types";

function CloudMigrationPanel(props: {
  data: ICloudMigrationProps;
  featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
}) {
  const { data: cloudMigrationData } = useTina(props.data);
  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)

  const { heroSectionData, growthmessage, CollapseComponentData, whatweoffer } =
    cloudMigrationData.cloudMigration;

  const gettouchref = useRef<HTMLDivElement>(null);
  const howcanhelpserviceref= useRef<HTMLDivElement>(null);
  const ourprocessservicecollapseref = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);


  return (
    <div>
      <ServicesHeroSection {...heroSectionData} ref={overviewRef}  refLabels={[ { name: "OVERVIEW", ref: overviewRef }, {name:"HOW CAN WE HELP", ref:howcanhelpserviceref},{name:"OUR PROCESS", ref:ourprocessservicecollapseref} ,{name: "GET IN TOUCH", ref:gettouchref}]} contactusref ={gettouchref} />

      <WhatWeOffer data={whatweoffer} ref={howcanhelpserviceref} />
      <MessageBanner {...growthmessage} />
      <CollapseComponent data={CollapseComponentData} ref ={ourprocessservicecollapseref} />
       <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0,3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />


    </div>
  );
}

export default CloudMigrationPanel;
