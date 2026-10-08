"use client";
import React, { useRef } from "react";
import { useTina } from "tinacms/dist/react";
import  ContactUsForm  from "../../../ContactUsForm";
import CollapseComponent from "../../../../common/CollapseComponents";
import { ISapHanaProps } from "../../../../interfaces/sapHana";
import ServicesHeroSection from "../../../../common/services/heroSection";
import HowCanWeHelpComponent from "../../../howCanWeHelpSection";
import WhatWeOfferDetails from "../../../WhatWeOfferDetails";
import { ContactusbannerQuery } from "../../../../tina/__generated__/types";
import { IFeaturedBlogs } from "../../../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../../../interfaces/contactUs";
import ContactusBanner from "../../../ContactusBanner";
import FeaturedBlogsPreview from "../../../FeaturedBlogsPreview";
const SapHanaPanel = (props: {
  data: ISapHanaProps;
  featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
}) => {
  const { data: sapHanaData } = useTina(props.data);
 const { data: featuredBlogsList } = useTina(props.featuredBlogs)
 const { data: contactUsBannerData } = useTina(props.contactUsBanner)
  const { heroSectionData, CollapseComponentData, howCanWeHelpSection, sapCards, offerDetailCards, offerDetails } =
    sapHanaData.sap_hana;
  const howCanWeHelpSectionData = { ...howCanWeHelpSection, cards: sapCards };
  const ourOfferingDetails={...offerDetails, cards:offerDetailCards}
  const technicalhanaRef = useRef<HTMLDivElement>(null);
  const roadmapref = useRef<HTMLDivElement>(null);
  const whatweofferhanaref = useRef<HTMLDivElement>(null);
  const hanaref = useRef<HTMLDivElement>(null);
  const gettouchref = useRef<HTMLDivElement>(null);

  return (
    <div>
      <ServicesHeroSection {...heroSectionData} paraAlignmentCol darkTheme ref={roadmapref} refLabels={[{name:"ROADMAPS AND STRATEGY", ref:roadmapref},{ name: "TECHNICAL MIGRATIONS", ref: technicalhanaRef }, {name:"WHAT WE OFFER", ref:whatweofferhanaref},{name:"S/4 HANA", ref:hanaref},  { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />
      <CollapseComponent data={CollapseComponentData} ref={technicalhanaRef} />
      <div>
        <WhatWeOfferDetails {...ourOfferingDetails} ref={whatweofferhanaref} />
      </div>
      <HowCanWeHelpComponent
        {...howCanWeHelpSectionData as any}
        cardAlignment="left" ref={hanaref}
      />
      <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0,3)} />
      <ContactUsForm darkTheme={true}  ref={gettouchref}/>
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />
    </div>
  );
};
export default SapHanaPanel;
