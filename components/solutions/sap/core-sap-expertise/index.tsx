'use client';
import React, { useRef } from 'react'
import { ICoreSapExpertiseProps } from '../../../../interfaces/CoreSapProps'
import { useTina } from 'tinacms/dist/react'
import ServicesHeroSection from '../../../../common/services/heroSection'
import CollapseComponent from '../../../../common/CollapseComponents';
import ContactUsForm from '../../../ContactUsForm';
import CollapseDropDown from '../../../../common/CollapseDropDown';
import WhatWeOfferDetails from '../../../WhatWeOfferDetails';
import { IFeaturedBlogs } from '../../../../interfaces/IFeaturedBlogs';
import { IContactUsBanner } from '../../../../interfaces/contactUs';
import { ContactusbannerQuery } from '../../../../tina/__generated__/types';
import ContactusBanner from '../../../ContactusBanner';
import FeaturedBlogsPreview from '../../../FeaturedBlogsPreview';
const CoreSapExpertisePanel = (props: {
  data: ICoreSapExpertiseProps, featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
}) => {
  const { data: coreSap } = useTina(props.data)
  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)
  const { heroSectionData, CollapseComponentData, accordionFlow, accordionContent, rollouts, rolloutCards } = coreSap?.coreSapExpertise
  const accordionData = { ...accordionFlow, cards: accordionContent }
  const ourOfferingDetails = { ...rollouts, cards: rolloutCards }
  const enhancementref = useRef<HTMLDivElement>(null);
  const mergesref = useRef<HTMLDivElement>(null);
  const Templateref = useRef<HTMLDivElement>(null);
  const gettouchref = useRef<HTMLDivElement>(null);
  return (
    <div>
      <ServicesHeroSection {...heroSectionData} hideComponent={true} refLabels={[{ name: "ENHANCEMENTS AND OPTIMIZATIONS", ref: enhancementref }, { name: "MERGES, ACQUISITIONS AND DIVERSITIES", ref: mergesref }, { name: "TEMPLATE-BASES GLOBAL / LOCAL ROLLOUTS", ref: Templateref }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />
      <CollapseComponent data={CollapseComponentData} ref={enhancementref} />
      <CollapseDropDown {...accordionData} ref={mergesref} />
      <WhatWeOfferDetails {...ourOfferingDetails} ref={Templateref} />
      <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0, 3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />
    </div>
  )
}
export default CoreSapExpertisePanel