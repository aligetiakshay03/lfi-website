import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { BankingSpecializationList, FintechSpecializationList, FmcgSpecializationList, InsuranceSpecializationList, ManufacturingSpecializationList, MiningSpecializationList, OilandgasSpecializationList, TelecomSpecializationList } from '../../tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import HeaderComponent from '../../components/HeaderComponent';
import { Tabs } from 'antd';
import Image from 'next/image';
import styles from './specializationlist.module.scss';
import { NoNameBtn } from '../../components/Button/Button';
// import { NoNameBtn } from '../Button/Button';

const { TabPane } = Tabs;

// interface SpecializationProps {
//     heading: string;
//     list: Array<{
//         image: string;
//         title: string;
//         desc: string;
//     }>;
// }

// const OurSpecialization = forwardRef<HTMLDivElement, SpecializationProps>((props, ref) => {
const OurSpecialization = forwardRef<HTMLDivElement>((props: FmcgSpecializationList | OilandgasSpecializationList | BankingSpecializationList | InsuranceSpecializationList | TelecomSpecializationList | MiningSpecializationList | FintechSpecializationList | ManufacturingSpecializationList, ref) => {

    const { heading, list } = props;

    const [activeKey, setActiveKey] = useState('0');
    const [hoveredKey, setHoveredKey] = useState<string | null>(null);
    const tabContainerRef = useRef<HTMLDivElement>(null);

    const handleTabChange = (key: string) => {
        setActiveKey(key);
    };

    const debounce = (func: Function, delay: number) => {
        let timer: ReturnType<typeof setTimeout>;
        return (...args: any[]) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const handleMouseEnter = debounce((key: string) => {
        handleTabChange(key);
        setHoveredKey(key);
    }, 100);

    const handleMouseLeave = () => {
        setHoveredKey(null);
    };

    const goToNextTab = () => {
        if (!list || list.length === 0) return;
        const nextKey = (parseInt(activeKey) + 1) % list.length;
        setActiveKey(nextKey.toString());

        const tabElements = tabContainerRef.current?.querySelectorAll<HTMLElement>('.ant-tabs-tab');
        const nextTabElement = tabElements?.[nextKey];

        if (nextTabElement) {
            nextTabElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
    };

    const goToPrevTab = () => {
        if (!list || list.length === 0) return;
        const prevKey = (parseInt(activeKey) - 1 + list.length) % list.length;
        setActiveKey(prevKey.toString());

        const tabElements = tabContainerRef.current?.querySelectorAll<HTMLElement>('.ant-tabs-tab');
        const prevTabElement = tabElements?.[prevKey];

        if (prevTabElement) {
            prevTabElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
    };

    useEffect(() => {
        return () => { };
    }, []);

    return (
        <div ref={ref} className={styles.maincontainer}>
            <div  className={styles.container}>
                <h3  className={styles.heading}>Our Specialization</h3>
                <div className={styles.imageContentWrapper}>
                    <div className={`${styles.imageWrapper} ${hoveredKey !== null ? styles.hover : ''}`}>
                        <Image
                            src={list && list[parseInt(activeKey)]?.image || ""}
                            alt={`Specialization ${parseInt(activeKey) + 1}`}
                            objectFit="cover"
                            fill
                            className={styles.image}
                        />
                    </div>
                    <div className="absolute px-3 bg-opacity-50 inset-0">
                        <div className={styles.cardheading}>
                            <h2 className=''>
                                {list && list[activeKey]?.title}
                            </h2>
                        </div>
                        <div className={styles.carddescription}>
                            <p className=''>
                                {list && list[activeKey]?.desc}
                            </p>
                        </div>
                    </div>
                </div>



                <div className={styles.bottomTabs} ref={tabContainerRef}>
                    <Tabs activeKey={activeKey} onChange={handleTabChange} type="card" className={styles.tabContainer}>
                        {Array.isArray(list) &&
                            list.map((item, index) => (
                                <TabPane
                                    tab={
                                        <div className={styles.multipletabs}>
                                            <div className="flex flex-col items-start gap-2 flex-shrink-0" onMouseEnter={() => handleMouseEnter(index.toString())} onMouseLeave={handleMouseLeave}>
                                                <h2 className={`text-[#E6ECED] font-['MonsalGothicMedium'] text-[20px] max-2xl:text-[15px] leading-[140%] max-sm:text-[12px] ${activeKey === index.toString() ? 'text-[#FF7800]' : ''}`}>
                                                    {index > 8 ? index + 1 : "0" + (index + 1)}
                                                </h2>
                                                <h1 className={styles.tabtitle} data-tina-field={item?.title && tinaField(item, "title")}>
                                                    {item?.title}
                                                </h1>
                                            </div>
                                        </div>
                                    }
                                    key={index.toString()}
                                >
                                </TabPane>
                            ))}
                    </Tabs>
                </div>

            </div>
            <div className={`${styles.button_con}`}>
                <NoNameBtn
                    theme="dark"
                    onClick={goToPrevTab}
                    className={styles.prevBtn}
                />
                <NoNameBtn
                    theme="dark"
                    onClick={goToNextTab}
                    className={styles.nextBtn}
                />
            </div>
        </div>

    );
});

export default OurSpecialization;




// <div className='bg-[url("/images/S1.png")] !bg-cover py-[60px] 2xl:px-[100px] md:px-[60px] px-5'>
//     <div data-tina-field={tinaField(props, "heading")}><HeaderComponent title={heading} font={"font-['libre-franklin']"}/></div>
//     <div className='mt-[10px] text-white'>
//         {Array.isArray(list) && list.map((item, index) => (
//             <div key={index} className={`flex justify-between py-[60px] ${index+1!=list.length && 'border-b-[1px]'} border-solid border-[#A2A5A6] max-md:flex-col`}>
//                 <h1 data-tina-field={item?.title && tinaField(item, "title")} className='xl:!w-[480px] lg:w-[30%] w-full flex items-center text-[#e6ECED] 2xl:text-[30px] font-["MonsalGothicMedium"] md:text-[24px] text-[18px] leading-[140%] max-lg:pr-5'><span className='text-[#FFF] opacity-30 font-["MonsalGothicMedium"] 2xl:text-[64px] text-[48px] leading-[140%] mr-[30px]'>{index > 8 ? index + 1 : "0" + (index + 1)}</span>{item?.title}</h1>
//                 <p data-tina-field={item?.title && tinaField(item, "desc")} className='md:w-[60%] w-full text-[#A2A5A6] font-["libre-franklin"] font-normal leading-[140%] 2xl:text-[24px] md:text-[20px] text-[14px] max-md:mt-2'>{item?.desc}</p>
//             </div>
//         ))}
//     </div>
// </div>


