import React, { forwardRef } from "react";
import styles from "./styles.module.scss";
import HeaderComponent from "../../components/HeaderComponent";
import { Row } from "antd";
import { tinaField } from "tinacms/dist/react";
import { ServiceAndMoreMarketingAndPromotionsContent } from "../../tina/__generated__/types";

interface Iprops {
  status1?: string;
  heading1?: string;
  desc?: string | undefined | null;
  content?: ServiceAndMoreMarketingAndPromotionsContent | null;
  paraAlignmentCol?: boolean;
  darkTheme?: boolean;
}
  const MarketingAndPromotionsSection = forwardRef<HTMLDivElement, Iprops>((props, ref) => {

  const { status1, heading1, content, desc, darkTheme, paraAlignmentCol } =
    props;
  return (
    <div ref={ref} className={`${styles.container}`}>
      <div   data-tina-field={tinaField(props, "status1")}>
        <HeaderComponent title={status1} font={"font-['libre-franklin']"}/>
      </div>
      <h1
        data-tina-field={tinaField(props, "heading1")}
        className={styles.header}
      >
        {heading1}
      </h1>
      <p data-tina-field={tinaField(props, "desc")} className={styles.desc}>
        {desc}
      </p>

      <Row>
        <div
          className={` flex flex-col gap-[10px] py-[20px] xl:py-[48px] min-[1561px]:py-[40px]  items-start w-full`}
        >
          <div className=" flex flex-col items-start gap-[6px] lg:gap-[8px] min-[1561px]:gap-[16px] flex-[1_0_0]">
            <div
              className={`sm:flex sm:flex-col ${
                paraAlignmentCol ? "xl:flex-col" : "xl:flex-row"
              }  justify-between items-start text-left self-stretch w-full`}
            >
              {content?.heading1 && (
                <div
                  data-tina-field={tinaField(props, "content")}
                  className={`pt-[6px] ${
                    paraAlignmentCol
                      ? " w-full text-[#E6ECED]"
                      : " w-full min-[1561px]:w-[35%] xl:w-[36%] text-[#E6ECED]"
                  } leading-[130%] xl:leading-[120%] text-[24px] xl:text-[32px] font-['MonsalGothicMedium'] min-[1561px]:text-[48px]`}
                >
                  {content.heading1}
                </div>
              )}

              <div
                className={` ${
                  paraAlignmentCol
                    ? " w-full pt-5 xl:pt-9"
                    : "w-full min-[1561px]:w-[100%] xl:w-[64%] pt-[16px]"
                }`}
              >
                <div
                  data-tina-field={tinaField(props, "content")}
                  className=" text-[#8A8E8F] font-[400] leading-[160%] font-['libre-franklin'] md:leading-[140%] text-[16px] xl:text-[18px] min-[1561px]:text-[24px] "
                >
                  {content?.desc}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
});

MarketingAndPromotionsSection.displayName = "MarketingAndPromotionsSection";


export default MarketingAndPromotionsSection;
