// import React from 'react'
import Image from 'next/image'
import React, { forwardRef } from 'react';
import styles from "./index.module.scss";
import HeaderComponent from '../HeaderComponent';

const ExplorationComponent = forwardRef((props: any, ref: any) => {
    const { title, heading, cardsData } = props;

    const status1 = "OUR EXPLORATION";
    const header = "A recipe for success";
    return (
        <div ref={ref}>
            <div className={`${styles.container}`}>
                <div className="mb-4">
                    <HeaderComponent title={status1} font={"font-['libre-franklin']"} />
                </div>
                <h2 className={`${styles.heading} font-normal text-white mb-8 sm:text-[20px] md:text-[24px] lg:text-[32px] 2xl:text-[48px]`}>{header}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {cardsData.map((card, index) => (
                        <div key={index} className="p-6 bg-[#272727] rounded-lg flex max-sm:flex-col">
                            <div className={`${styles.cardIcon} relative min-w-[48px] min-h-[48px] mb-[80px] mr-[36px]`}>   
                                <Image
                                    src={card.icon}
                                    fill
                                    alt={"plus"}
                                    quality={100}
                                    objectFit="contain"
                                />
                            </div>
                            <p className={`${styles.cardTitle} text-[24px] leading-[] font-[libre-franklin] text-[#E6ECED]`}>
                                {card.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
});

ExplorationComponent.displayName = 'ExplorationComponent'


export default ExplorationComponent