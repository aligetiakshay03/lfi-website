"use client";
import React, { useRef } from "react";
import ServicesHeroSection from "../../../common/services/heroSection";
import ContactUsForm from "../../ContactUsForm";
import { useTina } from "tinacms/dist/react";
import MessageBanner from "../../../common/MessageBanner";
import ProjectFlowCardSection from "../../../common/ProjectFlowCardSection/projectFlowCardSection";
import { IOdooProps } from "../../../interfaces/odoo";
import TechnologyDetailsComponent from "../../technologyDetails";
import { IFeaturedBlogs } from "../../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../../interfaces/contactUs";
import { ContactusbannerQuery } from "../../../tina/__generated__/types";
import ContactusBanner from "../../ContactusBanner";
import FeaturedBlogsPreview from "../../FeaturedBlogsPreview";
import OdooImplementationProcess from "../../OdooImplementationProcess";
const OdooPanel = (props: {
  data: IOdooProps; featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
}) => {
  const { data: odooData } = useTina(props.data);
  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)
  const {
    heroSectionData,
    messageBannerData,
    Benefits,
    Cards,
    odooImplementationAreasSection,
    OdooImplementationAreasCards,
  } = odooData.odoo;
  const BenefitsData = { ...Benefits, cards: Cards };
  const odooImplementationAreasData = {
    ...odooImplementationAreasSection,
    cards: OdooImplementationAreasCards,
  };
  const benefitserpref = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const implementationRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const gettouchref = useRef<HTMLDivElement>(null);
  return (
    <div>
      <ServicesHeroSection {...heroSectionData} ref={overviewRef} refLabels={[{ name: "OVERVIEW", ref: overviewRef }, { name: "BENEFITS", ref: benefitserpref }, { name: "Implementation Areas", ref: implementationRef }, { name: "Implementation Process", ref: processRef }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />
      <ProjectFlowCardSection {...BenefitsData} ref={benefitserpref} />
      <TechnologyDetailsComponent {...odooImplementationAreasData} ref={implementationRef} />
      <MessageBanner {...messageBannerData} />
      <OdooImplementationProcess ref={processRef} />
      <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0, 3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />
    </div>
  );
};
export default OdooPanel;
