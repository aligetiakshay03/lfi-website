'use client'
import React, { useRef } from 'react'
import { IERPSolutionsProps } from '../../../interfaces/ERPSolutionsProps'
import { useTina } from 'tinacms/dist/react'
import ServicesHeroSection from '../../../common/services/heroSection'
import CollapseComponent from '../../../common/CollapseComponents'
import HowCanWeHelpComponent from '../../howCanWeHelpSection'
import ContactUsForm from '../../ContactUsForm'
import { IFeaturedBlogs } from '../../../interfaces/IFeaturedBlogs'
import FeaturedBlogsPreview from '../../FeaturedBlogsPreview'
import { IContactUsBanner } from '../../../interfaces/contactUs'
import ContactusBanner from '../../ContactusBanner'
import { ContactusbannerQuery } from '../../../tina/__generated__/types'
const ERPSolutionsPanel = (props: {
  data: IERPSolutionsProps,
  featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
}) => {
  const { data: erpData } = useTina(props.data)
  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)
  const { heroSectionData, CollapseComponentData, TransformingOperations, Cards } = erpData?.erpSolutions
  const TransformingOperationsData = { ...TransformingOperations, cards: Cards }
  const ourprocessservicecollapseref = useRef<HTMLDivElement>(null);
  const transformingoperationerpref = useRef<HTMLDivElement>(null);
  const gettouchref = useRef<HTMLDivElement>(null);
  return (
    <div>
      <ServicesHeroSection {...heroSectionData} hideComponent  refLabels={[ {name:"SOLUTIONS OVERVIEW", ref:ourprocessservicecollapseref} ,{name:"TRANSFORMING OPERATIONS ACROSS THE BOARD", ref:transformingoperationerpref},{name: "GET IN TOUCH", ref:gettouchref}]} contactusref ={gettouchref}  />
      <CollapseComponent data={CollapseComponentData} ref ={ourprocessservicecollapseref}/>
      <HowCanWeHelpComponent
        {...TransformingOperationsData}
        cardAlignment="left"
        ref ={transformingoperationerpref}
      />
       <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0,3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref}/>
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />
    </div>
  )
}
export default ERPSolutionsPanel