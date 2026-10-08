'use client'
import React, { useRef } from 'react'
import { IAboutUsProps } from '../../../interfaces/aboutUsProps'
import { useTina } from 'tinacms/dist/react'
import ServicesHeroSection from '../../../common/services/heroSection'
import MediaSectionBlock from '../../../common/MediaSection'
import { AboutUsBetterFuture, AboutUsTransformingFuture, ContactusbannerQuery } from '../../../tina/__generated__/types'
import VisionCardsComponent from '../../VisionCardsComponent'
import { IConstantlyInnovating } from '../../../interfaces/constantlyInnovating'
import ConstantlyInnovatingBlock from '../../../common/ConstantlyInnovating'
import ContactUsForm from '../../ContactUsForm'
import HowCanWeHelpComponent from '../../howCanWeHelpSection'
import { IFeaturedBlogs } from '../../../interfaces/IFeaturedBlogs'
import { IContactUsBanner } from '../../../interfaces/contactUs'
import ContactusBanner from '../../ContactusBanner'
import FeaturedBlogsPreview from '../../FeaturedBlogsPreview'
import { ICareerPageProps } from '../../../interfaces/CareerPageProps'
import TeamMembersComponent from '../../TeamMembers'

const AboutUsPanel = (props: {
  data: IAboutUsProps, constantlyInnovating: IConstantlyInnovating, featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
  carrersData: ICareerPageProps
}) => {
  const { data: constantlyInnovatingData } = useTina(props.constantlyInnovating)
  const { data: aboutUsData } = useTina(props.data)
  const { data: careersData } = useTina(props.carrersData)

  // const { ourTeam, memberCards } = careersData?.careersPage

  // const membersData = { ...ourTeam, cards: memberCards }
  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)
  const { heroSectionData, transformingFuture, betterFuture, visionCards, transformationFlow, transformationCards } = aboutUsData?.aboutUs
  const howCanWeHelpSectionData = { ...transformationFlow, cards: transformationCards }
  const gettouchref = useRef<HTMLDivElement>(null);

  const ourstorycompanyref = useRef<HTMLDivElement>(null);
  const ourvisioncompanyref = useRef<HTMLDivElement>(null);
  const ourvaluescompanyref = useRef<HTMLDivElement>(null);
  const ourexpertisecompanyref = useRef<HTMLDivElement>(null);
  const csrcompanyref = useRef<HTMLDivElement>(null);
  // const theteamcompanyref = useRef<HTMLDivElement>(null);

  return (
    <div>
      
      <ServicesHeroSection {...heroSectionData} hideComponent refLabels={[{ name: "OUR STORY", ref: ourstorycompanyref }, { name: "Our Vision", ref: ourvisioncompanyref }, { name: "OUR VALUES", ref: ourvaluescompanyref } ,{ name: "OUR EXPERTISE", ref: ourexpertisecompanyref }, { name: "CSR", ref: csrcompanyref }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />
      <MediaSectionBlock data={transformingFuture as AboutUsTransformingFuture} ref={ourstorycompanyref} />
      <VisionCardsComponent {...visionCards} ref={ourvisioncompanyref} />
      <HowCanWeHelpComponent {...howCanWeHelpSectionData} cardAlignment="left" ref={ourvaluescompanyref} />
      {/* <TeamMembersComponent {...membersData} ref={theteamcompanyref} /> */}
      <ConstantlyInnovatingBlock constantlyInnovatingData={constantlyInnovatingData} ref={ourexpertisecompanyref} />
      <MediaSectionBlock data={betterFuture as AboutUsBetterFuture} ref={csrcompanyref} />
      <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0, 3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />
    </div>
  )
}

export default AboutUsPanel