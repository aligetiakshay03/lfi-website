"use client";
import React, { useRef } from "react";
import { IBlogCollection } from "../../../../interfaces/blogs";
import { useTina } from "tinacms/dist/react";
import BlogPreviewSection from "../../../BlogPreviewSection";
import ContactUsForm from "../../../ContactUsForm";
import ServicesHeroSection from "../../../../common/services/heroSection";
import HowCanWeHelpComponent from "../../../howCanWeHelpSection";
import { IServiceAndMoreProps } from "../../../../interfaces/service&more";
import HowCanWeHelp from "../../../HowCanWeHelp";
import { IDataServiesProps } from "../../../../interfaces/data-services";
import FeaturedBlogsPreview from "../../../FeaturedBlogsPreview";
import { IFeaturedBlogs } from "../../../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../../../interfaces/contactUs";
import { ContactusbannerQuery } from "../../../../tina/__generated__/types";
import ContactusBanner from "../../../ContactusBanner";
const DataServiecsPanel = (props: {
  data: IDataServiesProps;
  featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
}) => {
  const { data: dataServicesData } = useTina(props.data);
  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)
  const keyComponentref = useRef<HTMLDivElement>(null);
  const keyCapabilitieref = useRef<HTMLDivElement>(null);
  const dataserviceref = useRef<HTMLDivElement>(null);
  const gettouchref = useRef<HTMLDivElement>(null);
  const {
    heroSectionData,
    Cards,
    howCanWeHelp,
    keyCapabilities,
    keyComponents,
  } = dataServicesData.dataServices;
  const keyComponentsData = { ...keyComponents, cards: Cards };
  const keyCapabilitiesData = { ...keyCapabilities, helpItems: howCanWeHelp };
  return (
    <div>
      <ServicesHeroSection {...heroSectionData} paraAlignmentCol darkTheme ref={dataserviceref} refLabels={[ { name: "DATA SERVICES", ref: dataserviceref },{ name: "Key components", ref: keyComponentref }, { name: "Key capabilities", ref: keyCapabilitieref }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />
      <HowCanWeHelpComponent {...keyComponentsData} cardAlignment="left"  ref={keyComponentref}/>
      <HowCanWeHelp data={keyCapabilitiesData}  ref={keyCapabilitieref}/>
      <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0,3)} />
      <ContactUsForm darkTheme={true}  ref={gettouchref}  />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />
    </div>
  );
};
export default DataServiecsPanel;
