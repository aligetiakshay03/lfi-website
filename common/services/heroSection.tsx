"use client";
import React, { createRef, forwardRef, useEffect, useRef, useState } from 'react'
import Image from "next/image";
import { Col, Row } from "antd";
import HeaderComponent from "../../components/HeaderComponent";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Link from 'next/link';


interface IProps {
  heading1: string;
  subheading1: string;
  imagesrc: string;
  status1?: string | null | undefined;
  subheading2?: string | null | undefined;
  para1?: any;
  status2?: string | null | undefined;
  subheading3?: string | null | undefined;
  para2?: string | null | undefined;
  component?: React.ReactNode;
  paraAlignmentCol?: boolean;
  darkTheme?: boolean;
  hideComponent?: boolean;
  // persistentref?: any;
  // constantlyref?: any;
  contactusref?: any;
  refLabels?: { name: string, ref?: React.RefObject<HTMLDivElement>}[];
  refs?: { [key: string]: React.RefObject<HTMLDivElement> };
}

// const ServicesHeroSection = (props: IProps) => {
  const ServicesHeroSection = forwardRef<HTMLDivElement, IProps>((props, ref,) => {

  const {
    heading1,
    subheading1,
    imagesrc,
    status1,
    subheading2,
    para1,
    status2,
    subheading3,
    para2,
    component,
    paraAlignmentCol,
    darkTheme,
    hideComponent,
    refLabels,
    refs,
  } = props;

 
  // const overviewRef = useRef<HTMLDivElement>(null);
  const whatWeOfferRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: any) => {
    const navbarHeight = 100;
    // const navbarHeight = 40;



    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - navbarHeight,
        behavior: 'smooth'
      });
    } else {
    }
  };



  return (
    <>
      <div className="relative w-full flex flex-col gap-[24px] items-center justify-center">
        <div
          data-tina-field={tinaField(props, "imagesrc")}
          className="relative w-full max-md:!bg-contain h-[320px] lg:h-[384px] xl:h-[450px] min-[1561px]:h-[512px]"
        >
          <Image
            data-tina-field={tinaField(props, "imagesrc")}
            className="object-cover sm:object-center"
            src={imagesrc}
            alt="Logo"
            fill
            // objectFit="cover"
            // objectPosition="0% 70%"
          />
        </div>
        <div className="absolute flex flex-col items-center justify-center text-center bg-[#0000005a] w-full h-full">
          <div
            data-tina-field={tinaField(props, "heading1")}
            className="mt-[24px] text-[36px] font-['MonsalGothicMedium'] leading-[43px] min-[1561px]:text-[56px] min-[1561px]:leading-[56px] md:leading-[100%] text-[#E6ECED] pb-[16px] xl:pb-[24px]"
          >

            {heading1}
          </div>
          <div
            data-tina-field={tinaField(props, "subheading1")}
            className=" text-base md:text-[18px] leading-[19px] min-[1561px]:text-[32px] min-[1561px]:leading-[34px] font-['libre-franklin'] font-light text-[#E6ECED] max-sm:px-5"
          >
            {subheading1}


          </div>


        </div>

        {/* <div className="flex justify-between items-start absolute bottom-0 w-full px-[8px] py-[6px] md:px-[50px] md:py-[15px] xl:px-[80px] xl:py-[25px] 2xl:px-[100px] 2xl:py-[45px] bg-[rgba(0,0,0,0.70)]"> */}
        <div className="flex justify-between items-start absolute bottom-0 w-full px-[100px] py-[38px] max-[1560px]:px-[80px] max-[1560px]:py-[24px] max-[1025px]:px-[40px] max-[1025px]:py-[20px] max-[440px]:hidden bg-[rgba(0,0,0,0.70)]">

          {/* {status1 && (
            <button
              className="text-[#E6ECED] cursor-pointer font-[100] uppercase tracking-[0.8px] text-[8px] xl:text-[12px] xl:font-[100] 2xl:text-[20px] 2xl:font-[500] font-[MonsalGothicMedium]"
              onClick={() => scrollToRef(overviewRef)}
            >
              OVERVIEW
            </button>
          )}
          {status2 && (
            <button
              onClick={() => scrollToRef(whatWeOfferRef)}
              className="text-[#E6ECED] cursor-pointer font-[100] uppercase tracking-[0.8px] text-[8px] xl:text-[12px] xl:font-[100] 2xl:text-[20px] 2xl:font-[500] font-[MonsalGothicMedium]"
            >
              WHAT WE OFFER
            </button>
          )} */}

          {refLabels?.map((label) => (
            <button
              key={label.name}
              // className="text-[#E6ECED] cursor-pointer font-[100] uppercase tracking-[0.8px] text-[8px] xl:text-[14px] xl:font-[100] 2xl:text-[20px] 2xl:font-[500] font-[MonsalGothicMedium] hover:text-[#ff7800]"
              className="text-[#E6ECED] cursor-pointer font-[100] uppercase tracking-[0.8px] text-[20px] max-[1560px]:text-[18px] max-[1025px]:text-[14px]  max-sm:text-[10px] font-[MonsalGothicMedium] hover:text-[#ff7800]"

              onClick={() => scrollToRef(label.ref)}
            >
              {label.name}
            </button>

          ))}
        </div>



      </div>
      {!hideComponent && (
        <Row   >
          <div
            className={`${darkTheme
              // ? "bg-[#0A0A0A] px-[20px] py-[40px] md:p-[50px] lg:p-[60px] xl:p-[60px] min-[1561px]:p-[100px]"
              ? "bg-[#0A0A0A] p-[100px] max-[1560px]:p-[80px] max-[1025px]:p-[40px] max-sm:px-[20px] max-sm:py-40px]"

              // : "bg-[#F0F0F0] px-[20px] py-[40px] md:p-[50px] lg:p-[60px] xl:p-[60px] xl:pt-[48px] xl:pb-[64px] min-[1561px]:p-[100px] min-[1561px]:pt-[64px] min-[1561px]:pb-[96px]"
              : "bg-[#F0F0F0] p-[100px] max-[1560px]:p-[80px] max-[1025px]:p-[40px] max-sm:px-[20px] max-sm:py-40px]  xl:pt-[48px] xl:pb-[64px]  min-[1561px]:pt-[64px] min-[1561px]:pb-[96px]"

              
              }  flex flex-col gap-[10px] items-start w-full`}
          >
            <div  ref={ref} className=" flex flex-col items-start gap-[6px] lg:gap-[8px] min-[1561px]:gap-[16px] flex-[1_0_0]">
              {status1 && (
                <div data-tina-field={tinaField(props, "status1")}>
                  <HeaderComponent title={status1} font="font-['libre-franklin']" />
                </div>
              )}

              <div
                className={`sm:flex sm:flex-col ${paraAlignmentCol ? "xl:flex-col" : "xl:flex-row"
                  }  justify-between items-start text-left self-stretch w-full`}
              >
                {subheading2 && (
                  <div
                    data-tina-field={tinaField(props, "subheading2")}
                    className={`pt-[6px] ${paraAlignmentCol
                      ? " w-full text-[#E6ECED]"
                      : " w-full min-[1561px]:w-[45%] xl:w-[36%] text-[#272727]"
                      } leading-[130%] xl:leading-[120%] text-[24px] xl:text-[32px] min-[1561px]:text-[48px] font-['MonsalGothicMedium']`}
                  >
                    {subheading2}
                  </div>
                )}

                <div
                  className={` ${paraAlignmentCol
                    ? " w-full pt-5 xl:pt-9"
                    : "w-full xl:w-[48%] pt-[16px]"
                    }`}
                >
                  <TinaMarkdown
                    content={para1}
                    components={{
                      p: (paragraphData) => (
                        <p
                          data-tina-field={tinaField(props, "para1")}
                          className="text-[#8A8E8F] pb-5 text-left font-['libre-franklin'] leading-[160%] md:leading-[140%] text-[16px] xl:text-[18px] min-[1561px]:text-[28px] "
                          {...paragraphData}
                        />
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Row>
      )}
      {(status2 || subheading3 || para2 || component) && (
        // <div className="bg-[#E6ECED] flex  gap-[6px] xl:gap-[8px] min-[1561px]:gap-[10px] items-start px-5 py-6 lg:p-[50px] xl:p-[60px] min-[1561px]:p-[100px] justify-start ">
        <div className="bg-[#E6ECED] flex  gap-[6px] p-[100px] xl:gap-[8px] min-[1561px]:gap-[10px] items-start max-[1560px]:p-[80px] max-[1025px]:p-[40px] max-sm:p-[20px]  justify-start">

          <div  ref={refs?.whatWeOffer} className="flex flex-col items-start gap-[6px] lg:gap-[8px] min-[1561px]:gap-[16px] self-stretch">
            {status2 && (
              <HeaderComponent title={status2} font="font-['libre-franklin']" />
            )}
            {subheading3 && (
              <div
                data-tina-field={tinaField(props, "subheading3")}
                className="text-[#272727] text-[24px] xl:text-[32px] min-[1561px]:text-[48px] leading-[120%] font-['MonsalGothicMedium'] pt-[16px] xl:pt-[13px] min-[1561px]:pt-[16px]"
              >
                {subheading3}

              </div>
            )}

            {para2 && (
              <div
                data-tina-field={tinaField(props, "para2")}
                className="text-[#8A8E8F] text-[16px] xl:text-[18px] min-[1561px]:text-[28px] leading-[140%] xl:leading-[120%] font-['libre-franklin'] pt-[16px] xl:pt-[22px] xl:pb-[20px]"
              >
                {para2}
              </div>
            )}

            {component && <div className="pt-9">{component}</div>}
          </div>
        </div>
      )}
      <style jsx>{`
        .bannerImage {
          object-position: 0% 70%;
        }

        @media screen and (max-width: 768px) {
          .bannerImage {
            object-position: center;
          }
        }
      `}</style>
    </>
  );
});

export default ServicesHeroSection;
