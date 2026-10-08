import { Carousel, Tabs, TabsProps } from "antd";
import React, { useState } from "react";
import styles from "./serviceDetail.module.scss";
import { tinaField } from "tinacms/dist/react";
import { HomeOurServices, HomeOurServicesServiceTabs } from "../../tina/__generated__/types";
import Image from "next/image";
import Button from "../../common/Button";
import orangearrow from "../../public/images/arrow-orange.png";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ServiceDetailTabsProps {
  serviceData: HomeOurServices;
}

const serviceCardText = {
  description:
    'With more than a decade of experience & insight, we provide Digital, RPA, Quality Assurance, AI, SAP, and Technology Consulting Services to companies of all scales, around the globe',
};

const ServiceDetailTabs = ({ serviceData }: ServiceDetailTabsProps) => {
  const [selectedTab, setSelectedTab] = useState("Engineering Services");
  const onChange = (key: string) => {
    setSelectedTab(key);
  };


  const buttonUrl = serviceData.button?.url || '';



  const router = useRouter();

  const handleImageClick = (url: string) => {
    router.push(url);
  };

  return (
    <div className={styles.container}>

      <div className="flex flex-col gap-[63px] max-2xl:gap-[96px] max-[860px]:gap-[10px]  max-sm:gap-[20px] lg:flex-row flex-start">
        {/* <div className="flex flex-col lg:flex-row flex-start gap-[63px] pb-10 2xl:pb-20"> */}

        {/* <div className="mt-2"> */}
        <div className=" flex flex-col gap-[54px] max-2xl:gap-[36px] max-[860px]:gap-[24px]   max-sm:gap-[16px]">

          <h2 data-tina-field={tinaField(serviceData, "mainTitle")} className={styles.heading}>{serviceData.mainTitle}</h2>
          <p data-tina-field={tinaField(serviceData, "mainDesc")} className={styles.desc}>{serviceData?.mainDesc}</p>




          {serviceData && serviceData.button?.labelText && serviceData.button.url &&
            <Link href={serviceData.button.url}>


              <Button
                text={serviceData.button.labelText}
                icon={orangearrow}
                tinaProps={{ data: serviceData?.button, labelText: "labelText" }}
                className="2xl:w-[195px]  2xl:h-[68px] md:w-[151px] md:h-[48px] max-md:hidden"
                bgColor="transparent"
                borderColor="#FF7800"
                labelClass="2xl:text-[20px] text-[#FF7800] 2xl:leading-[19.76px] font-['libre-franklin'] font-normal md:text-[16px] md:leading-[15.81px]"
              />
            </Link>
          }
          <div className="flex ">
            {serviceData && serviceData.button?.labelText && serviceData.button.url &&
              <Link href={serviceData.button.url}>
                <Button
                  text={serviceData.button.labelText}
                  icon={orangearrow}
                  className="md:hidden"
                  bgColor="transparent"
                  labelClass="text-[#FF7800] font-['libre-franklin'] font-medium text-[16px] leading-[15.81px]"
                />

              </Link>

            }
          </div>

        </div>
        <div className="max-sm:w-[100%] max-[768px]:w-[100%] md:w-[100%] lg:w-[65%] xl:w-[72%]  2xl:w-[70%]">
          <Carousel
            autoplay
            dots={false}
            effect="scrollx"
            speed={1500}
            autoplaySpeed={2000}
            slidesToScroll={1}
            slidesToShow={3}
            pauseOnHover={true}
            waitForAnimate={true}
            responsive={[
              {
                breakpoint: 1560,
                settings: {
                  slidesToShow: 3,
                },
              },
              {
                breakpoint: 1280,
                settings: {
                  slidesToShow: 2,
                },
              },
              {
                breakpoint: 640,
                settings: {
                  slidesToShow: 1,
                  dots: true,
                },
              },
            ]}
          >

            {serviceData.serviceTabs?.map((item, index) => (
              <div key={index} className={styles.slider} onClick={() => handleImageClick(`${item?.url}`)} >
                  <div className={styles.carouselimages}>

                    <Image
                      src={item?.tabImage || ""}
                      alt={item?.tabImage || ""}
                      fill
                      data-tina-field={item && tinaField(item, "tabImage")}
                      className={styles.cardimage}
                    />


                  </div>

                <div className={styles.carouseltitle}>
                  <p data-tina-field={item && tinaField(item, "TabName")} className={styles.carddesc}>{item?.TabName}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailTabs;