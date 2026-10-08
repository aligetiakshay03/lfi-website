import React, { forwardRef } from 'react'
import { AboutUsVisionCards } from '../../tina/__generated__/types';
import Image from 'next/image';
import { tinaField } from 'tinacms/dist/react';
const VisionCardsComponent = forwardRef((props, ref:any) => {
    let newArray = Object.values(props).map((item, index) => {
        return item;
    });
    return (
        <div ref ={ref}  className='p-[100px] max-[1560px]:p-[80px] max-[1025px]:p-[40px] max-sm:p-[20px]'>
            <div >
                {newArray?.map((item: AboutUsVisionCards, index) => {
                    return (
                        <div  className={`py-[60px] md:flex justify-between max-lg:gap-[100px] items-center`} key={item?.heading}>
                            <div className='flex items-center gap-9 w-fit'>
                                {item?.logo && <Image data-tina-field={tinaField(item, "logo")} src={item?.logo} alt="image" width={96} height={96} />}
                                <h2 data-tina-field={tinaField(item, "heading")} className='2xl:text-[48px] lg:min-w-[32.46%] leading-9 md:text-[30px] text-[20px] text-[#E6ECED]'>{item.heading}</h2>
                            </div>
                            <p data-tina-field={tinaField(item, "content")} className='text-[#8A8E8F] md:text-[24px] md:leading-7 md:w-[50%] max-md:mt-5 font-["libre-franklin"] font-normal'>{item.content}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
});
VisionCardsComponent.displayName = 'VisionCardsComponent';
export default VisionCardsComponent