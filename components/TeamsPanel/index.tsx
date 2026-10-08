"use client";
import React, { useRef } from "react";
import ServicesHeroSection from "../../common/services/heroSection";
import MessageBanner from "../../common/MessageBanner";
import { IPersistentlyInnovative } from "../../interfaces/persistentlyInnovative";
import { useTina } from "tinacms/dist/react";
import PersistentlyInnovativeBlock from "../../common/PersistentlyInnovative";
import ConstantlyInnovatingBlock from "../../common/ConstantlyInnovating";
import { IConstantlyInnovating } from "../../interfaces/constantlyInnovating";
import ServicePageTabs from "../../common/services/ServicePageTabs";
import { ITeamsProps } from "../../interfaces/teamsInterface";
import { CloudTabItems, ConsultingTabItems, ContactusbannerQuery, TeamsTabItems } from "../../tina/__generated__/types";
import ContactUsForm from "../ContactUsForm";
import { IFeaturedBlogs } from "../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../interfaces/contactUs";
import FeaturedBlogsPreview from "../FeaturedBlogsPreview";
import ContactusBanner from "../ContactusBanner";
interface TeamsPanelProps {
  persistentlyInnovative: IPersistentlyInnovative;
  constantlyInnovating: IConstantlyInnovating;
  data: ITeamsProps;
  featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
}
const TeamsPanel = ({
  persistentlyInnovative,
  constantlyInnovating,
  data,
  featuredBlogs,
  contactUsBanner
}: TeamsPanelProps) => {
  const { data: persistentlyInnovativeData } = useTina(persistentlyInnovative);
  const { data: constantlyInnovatingData } = useTina(constantlyInnovating);
  const { data: teamsData } = useTina(data);
  const { heroSectionData, messageBannerData, messageBannerData2, tabItems } = teamsData.teams
  const { data: featuredBlogsList } = useTina(featuredBlogs)
  const { data: contactUsBannerData } = useTina(contactUsBanner)
  const heroSectionDataComponent = {
    ...heroSectionData, component: ((tabItems && tabItems.length > 0) && <ServicePageTabs tabItems={tabItems as TeamsTabItems[]} />)
  }
  const whyusRef = useRef<HTMLDivElement>(null);
  const ourexpertiseRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const whatWeOfferRef = useRef<HTMLDivElement>(null);
  const gettouchref = useRef<HTMLDivElement>(null);
  return (
    <div>
      <ServicesHeroSection
        {...heroSectionDataComponent} refs={{
          whatWeOffer: whatWeOfferRef,
        }} ref={overviewRef}  refLabels={[ { name: "OVERVIEW", ref: overviewRef }, { name: "WHAT WE OFFER", ref: whatWeOfferRef }, {name:"WHY US", ref:whyusRef}, {name: "OUR EXPERTISE", ref:ourexpertiseRef}, {name:"GET IN TOUCH" ,ref: gettouchref}]} contactusref ={gettouchref}
      />
      <MessageBanner
        {...messageBannerData}
      />
      <PersistentlyInnovativeBlock ref={whyusRef}
        persistentlyInnovativeData={persistentlyInnovativeData}
      />
      <ConstantlyInnovatingBlock ref={ourexpertiseRef}
        constantlyInnovatingData={constantlyInnovatingData}
      />
      <MessageBanner
        {...messageBannerData2}
      />
       <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0,3)} />
      <ContactUsForm darkTheme={true}  ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />
    </div>
  );
};
export default TeamsPanel;
