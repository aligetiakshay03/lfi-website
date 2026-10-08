import React from 'react'
import PlatformsComponent from '../platforms'
import { HomeTechnologies } from '../../tina/__generated__/types';

const OurTechnologies = (props) => {
  const chunks: HomeTechnologies[] = [];
  for (let i = 0; i <= props.data.length; i += 4) {
    const chunk = props?.data?.slice(i, i + 4);
    if (chunk.length) {
      chunks.push(chunk);
    }
  }
  return (
    <div>
      <div className="bg-[#020202] 2xl:p-[100px] lg:p-[60px] p-5">
        <h1 className='font-["MonsalGothicMedium"] text-center text-[#E6ECED] 2xl:text-[56px] lg:text-[36px] text-[24px] lg:leading-[58.8px] leading-[28.8px] max-lg:mt-10'>Our Technologies</h1>
        {chunks.map((item) => (<div className='pt-8' key={item?.icon}><PlatformsComponent data={{ heading:"", headingPosition: "center", platformCardsData: item as [] }} homePageTech={true} /></div>))}
      </div>
    </div>
  )
}

export default OurTechnologies