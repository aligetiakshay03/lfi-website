import React, { forwardRef, useRef } from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import HeaderComponent from "../../components/HeaderComponent";
import {
  AiMlMediaSection,
  BigDataMediaSection,
  ApplicationDevelopmentMediaSection,
  CloudConsultingPageMediaSection,
  DigitalTransformationMediaSection,
  KubernetesServicesMediaSection,
  ProductDiscoveryMediaSection,
  RoboticProcessAutomationMediaSection,
  SolutionDiscoveryMediaSection,
  StaffAugmentationMediaSection,
  AboutUsTransformingFuture,
  AboutUsBetterFuture,
  CareersPageCareersMedia,
  CareersPageLocationSliderMedia
} from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import PlatformsComponent from "../platforms";
import { Carousel } from "antd";
import { CarouselRef } from "antd/es/carousel";

interface IMediaSectionProps {
  ref : any;
  data:
  | SolutionDiscoveryMediaSection
  | ProductDiscoveryMediaSection
  | CloudConsultingPageMediaSection
  | KubernetesServicesMediaSection
  | DigitalTransformationMediaSection
  | RoboticProcessAutomationMediaSection
  | StaffAugmentationMediaSection
  | BigDataMediaSection
  | AiMlMediaSection
  | ApplicationDevelopmentMediaSection
  | AboutUsBetterFuture
  | CareersPageCareersMedia
  | CareersPageLocationSliderMedia
  | AboutUsTransformingFuture;
  order?: number;
  extraStyles?: React.CSSProperties; 
  className?: string;
 
}

// const MediaSectionBlock = ({ data, order }: IMediaSectionProps) => {
  const MediaSectionBlock = forwardRef<HTMLDivElement, IMediaSectionProps>(({ data, order, className, extraStyles  }, ref) => {

  const containerRef = useRef<CarouselRef | null>(null);

  const handleCarousalChange = (type: "left" | "right") => {
    switch (type) {
      case "left":
        containerRef.current && containerRef.current.prev();
        break;
      case "right":
        containerRef.current && containerRef.current.next();
        break;
      default:
       
    }
  };


  function isCareersPageLocationSliderMedia(
    data: IMediaSectionProps["data"]
  ): data is CareersPageLocationSliderMedia {
    return (
      "imagesSlider" in data &&
      data.imagesSlider !== undefined &&
      Array.isArray(data.imagesSlider)
    );
  }

  const imagesSlider = isCareersPageLocationSliderMedia(data)
    ? (data as CareersPageLocationSliderMedia).imagesSlider
    : undefined;
  return (
    <div
      className={styles.container + ` ${className}`}
      style={{ ...(data?.bgImageURL ? { backgroundImage: `url(${data.bgImageURL})` } : {}), ...extraStyles }}
    >
      <div  ref={ref} className={`flex flex-col min-[770px]:flex-row w-full ${imagesSlider?"":"items-center"} ${order ? "md:flex-row-reverse lg:gap-[171px] md:gap-[100px]" : ""}`}>
        <div    className={styles.contentSec}>
          <div data-tina-field={tinaField(data, "status")}>
            <HeaderComponent title={data?.status} font={"font-['libre-franklin']"}/>
          </div>
          <h2
            data-tina-field={tinaField(data, "title")}
            className={styles.title}
          >
            {data?.title}
          </h2>
          <p
            data-tina-field={tinaField(data, "description")}
            className={styles.description}
          >
            {data?.description}
          </p>
          {data?.points && (
            <div className="pt-8">
              {data.points.map((item, index) => {
                return (
                  <ul key={index} className={styles.points}>
                    <li
                      data-tina-field={tinaField(item, "points")}
                      className={styles.description}
                    >
                      {item?.points}
                    </li>
                  </ul>
                );
              })}
            </div>
          )}
        </div>
        <div className={styles.imageSec}>
          {data?.imageURL && (
            <Image
              data-tina-field={tinaField(data, "imageURL")}
              src={data?.imageURL}
              className={`${order ? '!rounded-[32px]' : ""}`}
              alt=""
              fill
              objectFit="contain"
            />
          )}
          {imagesSlider && imagesSlider.length > 0 && <div>
            <Carousel
              // autoplay
              ref={containerRef}
              dots={false}
              effect="scrollx"
              arrows
              autoplaySpeed={2000}
              slidesToScroll={1}
              slidesToShow={1}
              pauseOnHover={true}
              className="custom-carousel"
            >
              {imagesSlider.map((item) => {
                return (
                  <div key={item?.location} className="h-full">
                    {item?.image && <Image src={item?.image} alt={item?.image} height={1000} width={1000} />}
                    <div className={styles.border+" flex justify-between w-full items-center mt-[64px]"}>
                    <h1 className="text-[#E6ECED] text-[24px] leading-[39px] md:text-[36px]">{item?.location}</h1>
                    <div className="flex gap-[22px]">
                      <div
                        style={{
                          padding: "10px",
                          height: '40px',
                          width: '40%',
                          borderRadius: "50%",
                          background: "#272727",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleCarousalChange("left");
                        }}
                      >
                        <Image
                          src="/images/carousal-left.svg"
                          alt=""
                          width={21}
                          height={16}
                        />
                      </div>
                      <div
                        style={{
                          padding: "10px",
                          borderRadius: "50%",
                          height: '40px',
                          width: '40%',
                          background: "#272727",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleCarousalChange("right");
                        }}
                      >
                        <Image
                          src="/images/carousal-right.svg"
                          alt=""
                          width={21}
                          height={16}
                        />
                      </div>
                    </div>
                    </div>
                  </div>
                )
              })}
            </Carousel>
          </div>}
        </div>
      </div>
      {/* <PlatformsComponent data={{ 
        heading:"", headingPosition: "center", 
        platformCardsData: item as [] }} homePageTech={true} /></div>))}
      </div> */}
      {data.ourOffering && (
        <PlatformsComponent data={{
          heading: data.ourOffering?.heading,
          headingPosition: 'center',
          headingColor: '#FF7800',
          platformCardsData: data.ourOffering?.platformCardsData as []
        }}
        />
      )}
    </div>
  );
});

export default MediaSectionBlock;
