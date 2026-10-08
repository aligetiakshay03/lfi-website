import React, { forwardRef } from 'react'
import HeaderComponent from '../HeaderComponent';
import { tinaField } from 'tinacms/dist/react';

const WhatWeOfferDetails = forwardRef<HTMLDivElement, any>((props, ref) => {

    const { status1, heading1, desc, cards } = props;
    return (
        <div  ref={ref} className='p-[100px] max-[1560px]:p-[80px] max-[1025px]:p-[40px] max-sm:p-[20px]'>

            <HeaderComponent title={status1} font={"font-['libre-franklin']"} />
            {heading1 && <div  className='md:flex justify-between border-b-[5px] !border-[#FF7800] 2xl:pb-[64px] pb-[32px]'>
                <h1 data-tina-field={tinaField(props, "heading1")} className='2xl:text-[48px] lg:text-[36px] text-[24px] text-[#E6ECED] md:max-w-[36%]'>{heading1}</h1>
                <p data-tina-field={tinaField(props, "desc")} className='text-[#D1DCDEB2] 
 font-["libre-franklin"] font-medium 2xl:text-[28px] lg:text-[20px] text-[16px] md:leading-[35px] md:max-w-[50%] max-md:mt-5'>{desc}</p>
            </div>}
            <div>
                {cards?.map((item, index) => {
                    return (
                        <div className={`py-[60px] ${index !== cards.length - 1 && "border-b-2"} md:flex justify-between max-lg:gap-[100px]`} key={item.heading}>
                            <h2 data-tina-field={tinaField(item, "heading")} className='2xl:text-[36px] lg:min-w-[32.46%] leading-9 md:text-[24px] text-[20px] text-[#E6ECED] lg:pr-[100px]'>{item.heading}</h2>
                            <p data-tina-field={tinaField(item, "content")} className='text-[#E6ECED] md:text-[24px] md:leading-7 opacity-70 font-["libre-franklin"]'>{item.content}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
});

WhatWeOfferDetails.displayName = "WhatWeOfferDetails"

export default WhatWeOfferDetails