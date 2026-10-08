"use client";
import React, { useRef } from "react";
import ServicesHeroSection from "../../../common/services/heroSection";
import ProjectFlowCardSection from "../../../common/ProjectFlowCardSection/projectFlowCardSection";
import MessageBanner from "../../../common/MessageBanner";
import ContactUsForm from "../../ContactUsForm";
import BlogPreviewSection from "../../BlogPreviewSection";
import { useTina } from "tinacms/dist/react";
import { IProductDiscovery } from "../../../interfaces/productDiscovery";
import MediaSectionBlock from "../../../common/MediaSection";
import { IBlogCollection } from "../../../interfaces/blogs";
import { IFeaturedBlogs } from "../../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../../interfaces/contactUs";
import FeaturedBlogsPreview from "../../FeaturedBlogsPreview";
import ContactusBanner from "../../ContactusBanner";
import { ContactusbannerQuery } from "../../../tina/__generated__/types";

function ProductDiscoveryPanel(props: {
  data: IProductDiscovery;
  featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
}) {
  const { data: productDisoveryData } = useTina(props.data);

  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)

  const { heroSectionData, transformationCards, Projectflow, growthmessage } =
    productDisoveryData.productDiscovery;
  const MediaSectionData = productDisoveryData?.productDiscovery.MediaSection;

  const projectFlowCardData = { ...Projectflow, cards: transformationCards };

  const whatweofferserviceref = useRef<HTMLDivElement>(null);
  const ourprocessservicemediaref = useRef<HTMLDivElement>(null);
  const gettouchref = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <ServicesHeroSection {...heroSectionData} ref={overviewRef} refLabels={[{ name: "OVERVIEW", ref: overviewRef }, { name: "WHAT WE OFFER", ref: whatweofferserviceref }, { name: "OUR PROCESS", ref: ourprocessservicemediaref }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />
      <ProjectFlowCardSection {...projectFlowCardData} ref={whatweofferserviceref} />
      <MessageBanner {...growthmessage} />
      {MediaSectionData && <MediaSectionBlock data={MediaSectionData} ref={ourprocessservicemediaref} />}
      <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0, 3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />


    </div>
  );
}

export default ProductDiscoveryPanel;
