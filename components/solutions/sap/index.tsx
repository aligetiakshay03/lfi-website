"use client";
import React, { useRef } from "react";
import ServicesHeroSection from "../../../common/services/heroSection";
import ContactUsForm from "../../ContactUsForm";
import { useTina } from "tinacms/dist/react";
import { ContactusbannerQuery, PersistentlyInnovativeQuery } from "../../../tina/__generated__/types";
import PersistentlyInnovative from "../../../common/PersistentlyInnovative";
import { IPersistentlyInnovative } from "../../../interfaces/persistentlyInnovative";
import MessageBanner from "../../../common/MessageBanner";
import HowCanWeHelpComponent from "../../howCanWeHelpSection";
import { ISapProps } from "../../../interfaces/sap";
import { IFeaturedBlogs } from "../../../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../../../interfaces/contactUs";
import FeaturedBlogsPreview from "../../FeaturedBlogsPreview";
import ContactusBanner from "../../ContactusBanner";
const SapPanel = (props: {
  data: ISapProps;
  featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
  persistentlyInnovative: IPersistentlyInnovative;
}) => {
  const { data: sapData } = useTina(props.data);
  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)
  const { heroSectionData, HowCanWeHelpSection, messageBannerData, Cards } =
    sapData.sap;
  const howCanWeHelpSectionData = { ...HowCanWeHelpSection, cards: Cards };
  const { data: persistentlyInnovativeData } = useTina(
    props.persistentlyInnovative
  );
  const howcanhelperpref = useRef<HTMLDivElement>(null);
  const whyuserpref = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const gettouchref = useRef<HTMLDivElement>(null);
  return (
    <div>
      <ServicesHeroSection {...heroSectionData} ref={overviewRef} refLabels={[{ name: "OVERVIEW", ref: overviewRef },{ name: "HOW CAN WE HELP", ref: howcanhelperpref }, { name: "WHY US", ref: whyuserpref }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />
      <HowCanWeHelpComponent {...howCanWeHelpSectionData} ref={howcanhelperpref} />
      <MessageBanner {...messageBannerData} />
      {persistentlyInnovativeData && (
        <PersistentlyInnovative
          persistentlyInnovativeData={
            persistentlyInnovativeData as PersistentlyInnovativeQuery
          }
          ref={whyuserpref}
        />
      )}
      <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0, 3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />
    </div>
  );
};
export default SapPanel;
