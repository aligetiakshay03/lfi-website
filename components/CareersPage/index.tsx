'use client'
import React from 'react'
import { useTina } from 'tinacms/dist/react'
import { ICareerPageProps } from '../../interfaces/CareerPageProps'
import CareerSlider from '../../common/CareerSlider'
import WhatWeOffer from '../../common/WhatWeOffer'
import MediaSectionBlock from '../../common/MediaSection'
import { CareersPageCareersMedia, CareersPageLocationSliderMedia, ContactusbannerQuery } from '../../tina/__generated__/types'
import CareerPageCareerSection from '../../common/CareerPageCareerSection'
import Benefits from '../Benefits'
import { IContactUsBanner, IContactUsProps } from '../../interfaces/contactUs'
import ContactusBanner from '../ContactusBanner'

const CareersPanel = (props: { data: ICareerPageProps, contactUs: IContactUsProps, contactUsBanner: IContactUsBanner; }) => {
  const { data: careersData } = useTina(props.data)
  const { slider, whatweoffer, careersMedia, nextLevelCareer, letsBeFriends, ourPresence, locationSliderMedia } = careersData?.careersPage
  const { data: contactUsBanner } = useTina(props.contactUsBanner)

  return (
    <div>
      <CareerSlider {...slider} />
      <MediaSectionBlock data={careersMedia as CareersPageCareersMedia} order={2} />
      <MediaSectionBlock data={locationSliderMedia as CareersPageLocationSliderMedia} className='!pb-[160px] max-[1561px]:!pb-[240px] max-[860px]:!pb-[280px] max-[440px]:!pb-[90px]' />
      <WhatWeOffer data={whatweoffer} transparentCards={true} />
      <CareerPageCareerSection {...nextLevelCareer} />
      <Benefits data={props.contactUs} />
      <ContactusBanner {...contactUsBanner as ContactusbannerQuery} />
    </div>
  )
}

export default CareersPanel