"use client";
import React, { useRef } from "react";
import ServicesHeroSection from "../../../common/services/heroSection";
import WhatWeOffer from "../../../common/WhatWeOffer";
import MessageBanner from "../../../common/MessageBanner";
import BlogPreviewSection from "../../BlogPreviewSection";
import ContactUsForm from "../../ContactUsForm";
import { ICloudConsulting } from "../../../interfaces/cloudConsultingInterface";
import { useTina } from "tinacms/dist/react";
import MediaSectionBlock from "../../../common/MediaSection";
import { IBlogCollection } from "../../../interfaces/blogs";
import { IFeaturedBlogs } from "../../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../../interfaces/contactUs";
import FeaturedBlogsPreview from "../../FeaturedBlogsPreview";
import ContactusBanner from "../../ContactusBanner";
import { ContactusbannerQuery } from "../../../tina/__generated__/types";

function CloudConsultingPanel(props: {
  data: ICloudConsulting;
  blogPosts: IBlogCollection;
  featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
}) {
  const { data: cloudConsultingData } = useTina(props.data);
  const { data: blogPosts } = useTina(props.blogPosts);
  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)

  const { heroSectionData, growthmessage, whatweoffer, MediaSection } =
    cloudConsultingData.CloudConsultingPage;

  const whatweofferserviceref= useRef< HTMLDivElement>(null);
  const gettouchref = useRef<HTMLDivElement>(null);
  const howcanhelpserviceref= useRef<HTMLDivElement>(null);
  const ourprocessservicemediaref = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <ServicesHeroSection {...heroSectionData} ref= { overviewRef} refLabels={[{ name: "OVERVIEW", ref: overviewRef }, {name:"WHAT WE OFFER", ref:howcanhelpserviceref},{name:"OUR PROCESS", ref:ourprocessservicemediaref} ,{name: "GET IN TOUCH", ref:gettouchref}]} contactusref ={gettouchref} />
      <WhatWeOffer data={whatweoffer} ref={howcanhelpserviceref} />
      <MessageBanner {...growthmessage} />
      {MediaSection && <MediaSectionBlock data={MediaSection}  ref={ourprocessservicemediaref} />}
       <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0,3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />


    </div>
  );
}

export default CloudConsultingPanel;
