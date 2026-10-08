import { Col, Row } from "antd";
import React from "react";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import {
  StaffAugmentationPerformingLanguages,
  StaffAugmentationPlatforms,
} from "../../tina/__generated__/types";
import Link from 'next/link';


interface propsCombined {
  homePageTech?: boolean;
  data: StaffAugmentationPerformingLanguages | StaffAugmentationPlatforms,
}

const PlatformsComponent = (
  props: propsCombined
) => {
  const { heading, platformCardsData, headingPosition, headingColor } = props?.data;
  return (
    <div className="w-full">
      <div
        style={{ color: `${headingColor || 'white'}` }}
        className={`text-base md:text-lg 2xl:text-[28px] font-['HelveticaNeueSmallBold'] ${headingPosition ? `text-${headingPosition}` : "text-left"
          }  ${headingColor ? `text-[${headingColor}]` : "text-white"}`}
      >
        <span data-tina-field={tinaField(props?.data, "heading")}>
          {heading}
        </span>
      </div>
      {platformCardsData && (
        <Row
          gutter={[16, 16]}
          className="flex flex-wrap justify-around items-center mt-6 2xl:mt-8"
        >
          {platformCardsData.map((item, index) => {
            return (
              <Col key={index}>
                  <Link href={item?.url?? ""} target="_blank">
                <div
                  data-tina-field={tinaField(item, "icon")}
                  className={`flex justify-center w-[120px] h-[40px] md:w-[120px] md:h-[54px] ${props.homePageTech?"2xl:h-[42px]":"2xl:min-w-[170px] 2xl:h-[64px]"}`}
                >
                
                  <Image
                    className="!opacity-60"
                    src={item?.icon }
                    alt={"icons"}
                    layout="fill"
                    objectFit="contain"
                  />
                 
                </div>
                </Link>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};

export default PlatformsComponent;
