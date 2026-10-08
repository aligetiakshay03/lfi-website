"use client";
import React, { createRef, useEffect, useRef, useState } from 'react'
import ServicesHeroSection from "../../common/services/heroSection";
import MessageBanner from "../../common/MessageBanner";
import PersistentlyInnovativeBlock from "../../common/PersistentlyInnovative";
import { IPersistentlyInnovative } from "../../interfaces/persistentlyInnovative";
import { useTina } from "tinacms/dist/react";
import ConstantlyInnovatingBlock from "../../common/ConstantlyInnovating";
import { IConstantlyInnovating } from "../../interfaces/constantlyInnovating";
import ServicePageTabs from "../../common/services/ServicePageTabs";
import { AutomationTabItems, ContactusbannerQuery } from "../../tina/__generated__/types";
import { IAutomationPageProps } from "../../interfaces/AutomationPros";
import ContactUsForm from '../ContactUsForm';
import { IFeaturedBlogs } from '../../interfaces/IFeaturedBlogs';
import { IContactUsBanner } from '../../interfaces/contactUs';
import FeaturedBlogsPreview from '../FeaturedBlogsPreview';
import ContactusBanner from '../ContactusBanner';

interface AutomationPanelProps {
  persistentlyInnovative: IPersistentlyInnovative;
  constantlyInnovating: IConstantlyInnovating;
  data: IAutomationPageProps;
  featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
}
const AutomationPanel = ({
  persistentlyInnovative,
  constantlyInnovating,
  data,
  featuredBlogs,
  contactUsBanner,
}: AutomationPanelProps) => {
  const { data: persistentlyInnovativeData } = useTina(persistentlyInnovative);
  const { data: constantlyInnovatingData } = useTina(constantlyInnovating);
  const { data: automationData } = useTina(data)
  const { data: featuredBlogsList } = useTina(featuredBlogs)
  const { data: contactUsBannerData } = useTina(contactUsBanner)

  const { heroSectionData, messageBannerData, tabItems } =
    automationData.automation;
  const heroSectionDataComponent = {
    ...heroSectionData,
    component: tabItems && tabItems.length > 0 && (
      <ServicePageTabs tabItems={tabItems as AutomationTabItems[]} />
    ),
  };


  const whyusRef = useRef<HTMLDivElement>(null);
  const ourexpertiseRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);

  const whatWeOfferRef = useRef<HTMLDivElement>(null);

  const gettouchref = useRef<HTMLDivElement>(null);



  return (
    <div>
      <ServicesHeroSection {...heroSectionDataComponent} refs={{
        whatWeOffer: whatWeOfferRef,

      }} ref={overviewRef} refLabels={[{ name: "OVERVIEW", ref: overviewRef }, { name: "WHAT WE OFFER", ref: whatWeOfferRef }, { name: "WHY US", ref: whyusRef }, { name: "OUR EXPERTISE", ref: ourexpertiseRef }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />
      <PersistentlyInnovativeBlock ref={whyusRef}
        persistentlyInnovativeData={persistentlyInnovativeData}
      />
      <MessageBanner {...messageBannerData} />
      <ConstantlyInnovatingBlock ref={ourexpertiseRef}
        constantlyInnovatingData={constantlyInnovatingData}
      />
      <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0, 3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />
    </div>
  );
};

export default AutomationPanel;