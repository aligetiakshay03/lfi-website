'use client'
import React, { useRef } from 'react'
import { useTina } from 'tinacms/dist/react'
import { IOurApproachProps } from '../../../interfaces/OurApproachProps'
import ServicesHeroSection from '../../../common/services/heroSection'
import WhatWeOffer from '../../../common/WhatWeOffer'
import ExplorationComponent from '../../ExplorationComponent'
import { IConstantlyInnovating } from '../../../interfaces/constantlyInnovating'
import ConstantlyInnovating from '../../../common/ConstantlyInnovating'
import ContactUsForm from '../../ContactUsForm'
import { IFeaturedBlogs } from '../../../interfaces/IFeaturedBlogs'
import { IContactUsBanner } from '../../../interfaces/contactUs'
import { ContactusbannerQuery } from '../../../tina/__generated__/types'
import ContactusBanner from '../../ContactusBanner'
import FeaturedBlogsPreview from '../../FeaturedBlogsPreview'

const OurApproachPanel = (props: {
  data: IOurApproachProps, featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner, constantlyInnovating: IConstantlyInnovating
}) => {
  const { data: approachData } = useTina(props.data)

  const { data: featuredBlogsList } = useTina(props.featuredBlogs)
  const { data: contactUsBannerData } = useTina(props.contactUsBanner)
  const { data: constantlyInnovating } = useTina(props.constantlyInnovating)
  const { heroSectionData, whatweoffer, exploration } = approachData?.ourApproach

  const gettouchref = useRef<HTMLDivElement>(null);

  const howweworkcompanyref = useRef<HTMLDivElement>(null);
  const ourexplorationref = useRef<HTMLDivElement>(null);
  const ourexpertisecompanyref = useRef<HTMLDivElement>(null);
  return (
    <div>
      <ServicesHeroSection {...heroSectionData} hideComponent refLabels={[{ name: "HOW WE WORK", ref: howweworkcompanyref }, { name: "OUR EXPLORATION", ref: ourexplorationref }, { name: "OUR EXPERTISE", ref: ourexpertisecompanyref }, { name: "GET IN TOUCH", ref: gettouchref }]} contactusref={gettouchref} />
      <WhatWeOffer data={whatweoffer} transparentCards={undefined} ref={howweworkcompanyref} />
      <ExplorationComponent {...exploration} ref={ourexplorationref} />
      <ConstantlyInnovating constantlyInnovatingData={constantlyInnovating} ref={ourexpertisecompanyref} />
      <FeaturedBlogsPreview blogPosts={featuredBlogsList.featuredBlogs.blogListArray?.slice(0, 3)} />
      <ContactUsForm darkTheme={true} ref={gettouchref} />
      <ContactusBanner {...contactUsBannerData as ContactusbannerQuery} />


    </div>
  )
}

export default OurApproachPanel