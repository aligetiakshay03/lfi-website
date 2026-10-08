"use client";
import React, { useRef } from "react";
import ServicesHeroSection from "../../common/services/heroSection";
import MessageBanner from "../../common/MessageBanner";
import ContactUsForm from "../ContactUsForm";
import ServicePageTabs from "../../common/services/ServicePageTabs";
import { useTina } from "tinacms/dist/react";
import {
  AutomationTabItems,
  CloudTabItems,
  ConstantlyInnovatingQuery,
  ConsultingTabItems,
  ContactusbannerQuery,
  EngineeringTabItems,
  PersistentlyInnovativeQuery,
  TeamsTabItems,
  TechnologyTabItems,
} from "../../tina/__generated__/types";
import { IEngineeringComponent } from "../../interfaces/engineeringComponent";
import { IPersistentlyInnovative } from "../../interfaces/persistentlyInnovative";
import { IConstantlyInnovating } from "../../interfaces/constantlyInnovating";
import ConstantlyInnovating from "../../common/ConstantlyInnovating";
import PersistentlyInnovative from "../../common/PersistentlyInnovative";
import { IFeaturedBlogs } from "../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../interfaces/contactUs";
import FeaturedBlogsPreview from "../FeaturedBlogsPreview";
import ContactusBanner from "../ContactusBanner";

const EngineeringComponent = (props: {
  data: IEngineeringComponent;
  constantlyInnovating: IConstantlyInnovating;
  persistentlyInnovative: IPersistentlyInnovative;
  featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
}) => {
  const { data: engineeringData } = useTina(props.data);
  const { data: constantlyInnovatingData } = useTina(
    props.constantlyInnovating
  );
  const { data: persistentlyInnovativeData } = useTina(
    props.persistentlyInnovative
  );
  const { tabItems, heroSectionData, messageBannerData } =
    engineeringData.engineering;
  const heroSectionDataCompItem = {
    ...heroSectionData,
    component: <ServicePageTabs tabItems={tabItems as ConsultingTabItems[] | CloudTabItems[] | TeamsTabItems[] | AutomationTabItems[] | EngineeringTabItems[] | TechnologyTabItems[]} />,
  };

  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)

  const whyusRef = useRef<HTMLDivElement>(null);
  const ourexpertiseRef = useRef<HTMLDivElement>(null);
  const whatWeOfferRef = useRef<HTMLDivElement>(null);

  const overviewRef = useRef<HTMLDivElement>(null);

  const gettouchref = useRef<HTMLDivElement>(null);

  return (
    <div>
      <ServicesHeroSection {...heroSectionDataCompItem} refs={{
        whatWeOffer: whatWeOfferRef,


      }} ref={overviewRef} refLabels={[{ name: "OVERVIEW", ref: overviewRef }, { name: "WHAT WE OFFER", ref: whatWeOfferRef }, { name: "WHY US", ref: whyusRef }, { name: "OUR EXPERTISE", ref: ourexpertiseRef }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />
      {persistentlyInnovativeData && (
        <PersistentlyInnovative ref={whyusRef}
          persistentlyInnovativeData={
            persistentlyInnovativeData as PersistentlyInnovativeQuery
          }
        />
      )}
      <MessageBanner {...messageBannerData} />
      {constantlyInnovatingData && (
        <ConstantlyInnovating ref={ourexpertiseRef}
          constantlyInnovatingData={
            constantlyInnovatingData as ConstantlyInnovatingQuery
          }
        />
      )}
      <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0, 3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />
    </div>
  );
};

export default EngineeringComponent;
