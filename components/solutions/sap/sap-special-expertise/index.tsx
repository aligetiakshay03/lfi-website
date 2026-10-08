'use client'
import React, { useRef } from 'react'
import ServicesHeroSection from '../../../../common/services/heroSection'
import { ISapSpecialExpertiseProps } from '../../../../interfaces/SapSpecialExpertiseProps'
import { useTina } from 'tinacms/dist/react'
import FullPageAccordionComponent from '../../../FullPageAccordionComponent'
import ContactUsForm from '../../../ContactUsForm'
import { IFeaturedBlogs } from '../../../../interfaces/IFeaturedBlogs'
import { IContactUsBanner } from '../../../../interfaces/contactUs'
import { ContactusbannerQuery } from '../../../../tina/__generated__/types'
import ContactusBanner from '../../../ContactusBanner'
import FeaturedBlogsPreview from '../../../FeaturedBlogsPreview'
const SapSpecialExpertisePanel = (props: {
  data: ISapSpecialExpertiseProps, featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
}) => {
  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)
  const { data: specialExpertise } = useTina(props.data)
  const { heroSectionData, fullPageAccordion } = specialExpertise.sapSpecialExpertise
  const gettouchref = useRef<HTMLDivElement>(null);
  return (
    <div>
      <ServicesHeroSection {...heroSectionData} hideComponent refLabels={[  { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref}  />
      <FullPageAccordionComponent {...fullPageAccordion} />
       <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0,3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref}/>
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />
    </div>
  )
}
export default SapSpecialExpertisePanel