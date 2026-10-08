import React from "react";
import Image from "next/image";
import { Col, Row } from "antd";

interface Iprops {
  logo?: string;
  bgcolor?: string;
  heading: string;
  content: string;
}
const Card = ({ logo, bgcolor, heading, content }: Iprops) => {
  return (
    <>
      <div className="pt-[40px]  ">
        <div className="  sm:h-[200px] md:h-[240px] lg:h-[270px] xl:h-[330px] 2xl:h-[330px] p-[20px]   2xl:p-[30px] 2xl:w-[550px] gap-[36px] items-start rounded-[24px] bg-[#27272766] bg-opacity-40  border border-solid border-gray-300 border-opacity-5 flex-col  shadow md:flex-row md:max-w-xl">
          <Row className="flex w-full">
            {logo && (
              <div className="pt-[20px] inline-block pl-[20px] 2xl:pt-[30px] 2xl:pl-[30px]">
                <Col span={8}>
                  <div
                    className={`${bgcolor} object-contain flex items-center justify-center h-[25px] w-[25px] lg:h-[40px] lg:w-[40px] xl:h-[60px] xl:w-[60px] 2xl:h-[74px] 2xl:w-[74px]  rounded-[5px] lg:rounded-[16px] xl:rounded-[16px] 2xl:rounded-[16px]  flex-shrink-0`}
                  >
                    <Image
                      className=""
                      src={logo}
                      height={38}
                      width={38}
                      alt="edit"
                      objectFit="contain"
                    />
                  </div>
                </Col>
              </div>
            )}
            <Col span={logo ? 16 : 24}>
              <div className="flex flex-col p-[12px] md:p-[15px] lg:p-[18px] xl:p-[25px] leading-normal">
                <div
                  className={` text-[#F0F0F0] ${
                    logo
                      ? "text-[20px] lg:text-[20px] xl:text-[25px] 2x:text-[25px] max-w-[380px] leading-[1.2]"
                      : "leading-[1.2] text-[20px] lg:text-[20px] xl:text-[25px] 2xl:text-[38px]"
                  } font-medium  leading-[101%] `}
                >
                  {heading}
                </div>
                <div
                  className={`w-full pt-[8px] text-[#A2A5A6] text-opacity-70 font-[400px]  ${
                    logo ? "text-[16px] max-w-[380px]" : "text-2xl"
                  }`}
                >
                  {content}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Card;
