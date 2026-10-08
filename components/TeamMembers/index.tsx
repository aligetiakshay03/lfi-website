import React, { forwardRef } from 'react'
import HeaderComponent from '../HeaderComponent';
import Image from 'next/image';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
const TeamMembersComponent = forwardRef((props: any) => {
    const { status1, heading1, desc, cards } = props;
    const router = useRouter()
    return (
        < div 
            className='bg-[url("/images/Teambackground.png")] !bg-cover flex flex-col gap-4 p-[100px]  max-[1560px]:p-[80px] max-[1025px]:p-[40px] max-sm:p-[20px]'>
            <HeaderComponent title={status1} className="text-center" font={"font-['libre-franklin']"} />
            <h1  className='font-[MonsalGothicMedium] text-[#E6ECED] text-[48px] leading-[130%] max-[1560px]:text-[32px] max-[768px]:text-[24px]'> {heading1}</h1>
            <div   className='mt-[64px]  2xl:mt-[24px] justify-center text-center items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                {cards && cards.map((item, index) => (
                    <div key={index} className='bg-[#272727d9] p-6 rounded-[24px] max-w-full flex flex-col justify-between h-full'>
                        <div className='overflow-hidden rounded-[16px] flex justify-center'>
                            <div className='relative w-[360px] h-[350px] '>
                            <Image className='absolute' src={item.logo ?? ""} alt={item.logo ?? "Img"} style={{
                                objectFit: 'contain',
                            }} fill />
                            </div>
                        </div>
                        <div className='flex-grow'>
                            <h1 className='text-[#E6ECED] 2xl:text-[24px] md:text-[20px] text-[18px] md:leading-[30px] leading-6 mt-6'>{item.heading}</h1>
                            <p className='text-[#8A8E8F] font-["libre-franklin"] font-normal 2xl:text-[20px] md:text-[18px] text-[16px] md:leading-[30px] leading-6 mt-4'>{item.content}</p>
                        </div>
                        <div className='flex justify-center mt-auto'>
                            {item.actionButton.map((links) => (
                                <div key={links.url} className="relative h-[30px] w-[30px] mt-5 mb-4">
                                    <Button style={{ padding: '0px', height: '30px', width: '30px', background: "transparent", border: "0px" }} onClick={() => {
                                        window.open(links.url, '_blank');
                                    }} icon={<Image
                                        src={links.icon}
                                        alt="linfields-logo"
                                        layout="fill"
                                        objectFit="contain"
                                    />} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
});
TeamMembersComponent.displayName = 'TeamMembersComponent'
export default TeamMembersComponent