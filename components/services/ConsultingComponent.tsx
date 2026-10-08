"use client";
import React, { useRef } from "react";
import ServicePageTabs from "../../common/services/ServicePageTabs";
import ServicesHeroSection from "../../common/services/heroSection";
import ConstantlyInnovating from "../../common/ConstantlyInnovating";
import PersistentlyInnovative from "../../common/PersistentlyInnovative";
import MessageBanner from "../../common/MessageBanner";
import ContactUsForm from "../ContactUsForm";
import { useTina } from "tinacms/dist/react";
import { ConstantlyInnovatingQuery, ConsultingTabItems, ContactusbannerQuery, PersistentlyInnovativeQuery } from "../../tina/__generated__/types";
import { IConsultingComponent } from "../../interfaces/consultingComponent";
import { IFeaturedBlogs } from "../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../interfaces/contactUs";
import FeaturedBlogsPreview from "../FeaturedBlogsPreview";
import ContactusBanner from "../ContactusBanner";

function ConsultingComponent(props: {
  data: IConsultingComponent, constantlyInnovating, persistentlyInnovative, featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
}) {

  const { data: consultingData } = useTina(props.data);
  const { data: constantlyInnovatingData } = useTina(props.constantlyInnovating)
  const { data: persistentlyInnovativeData } = useTina(props.persistentlyInnovative)
  const { tabItems, heroSectionData, messageBannerData } = consultingData.consulting
  const heroSectionDataCompItem = {
    ...heroSectionData, component: ((tabItems && tabItems.length > 0) && <ServicePageTabs tabItems={tabItems as ConsultingTabItems[]} />)
  }


  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)

  const whyusRef = useRef<HTMLDivElement>(null);
  const ourexpertiseRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);

  const whatWeOfferRef = useRef<HTMLDivElement>(null);


  const gettouchref = useRef<HTMLDivElement>(null);



  return (
    <div>
      <ServicesHeroSection {...heroSectionDataCompItem} refs={{
        whatWeOffer: whatWeOfferRef,

      }} ref={overviewRef} refLabels={[{ name: "OVERVIEW", ref: overviewRef }, { name: "WHAT WE OFFER", ref: whatWeOfferRef },  { name: "OUR EXPERTISE", ref: ourexpertiseRef }, { name: "WHY US", ref: whyusRef }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />
      {constantlyInnovatingData && <ConstantlyInnovating ref={ourexpertiseRef}
        constantlyInnovatingData={constantlyInnovatingData as ConstantlyInnovatingQuery}
      />}
      {persistentlyInnovativeData && <PersistentlyInnovative ref={whyusRef}
        persistentlyInnovativeData={
          persistentlyInnovativeData as PersistentlyInnovativeQuery
        }
      />}
      <MessageBanner {...messageBannerData} />
      <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0, 3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />

    </div>
  );
}

export default ConsultingComponent;