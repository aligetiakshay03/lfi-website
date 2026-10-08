import React, { forwardRef } from "react";
import styles from "./ourSuperpowers.module.scss";
import HeaderComponent from "../../components/HeaderComponent";
import { Col, Row } from "antd";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";

interface Iprops {
  status1?: string;
  heading1?: string;
  desc?: string | undefined | null;
  bgLight?: boolean;
  ref?: any;
  cards?:
    | ({
        icon?: string | null | undefined;
        title: string;
        description: string;
      } | null)[]
    | null
    | undefined;
}

// const OurSuperPowersComponent = (props: Iprops) => {
  const OurSuperPowersComponent = forwardRef<HTMLDivElement, Iprops>((props, ref) => {

  const { status1, heading1, cards, bgLight } = props;
  return (
    <div  ref={ ref} className={`${styles.container} ${bgLight ? "#9EACAE" : "bg-black"}`}>
      <div  data-tina-field={tinaField(props, "status1")}>
        <HeaderComponent title={status1} font={"font-['libre-franklin']"}/>
      </div>
      <h1
        data-tina-field={tinaField(props, "heading1")}
        className={`${styles.header} ${
          bgLight ? "text-black" : "text-[#E6ECED]"
        }`}
      >
        {heading1}
      </h1>
      <Col className={styles.row} span={32}>
        <Row gutter={[48, 48]}>
          {cards?.map((item, index) => (
            <Col key={index} xs={24} md={cards.length > 4 ? 8 : 12}>
              <div
                className={`${styles.card_content} flex ${
                  cards.length > 4
                    ? "flex-row md:flex-col items-start justify-start"
                    : "flex-row"
                }`}
              >
                <div className="relative min-[1561px]:min-w-[86px] min-[1561px]:min-h-[86px] mt-1 min-w-[54px] min-h-[54px]">
                  {item?.icon ? (
                    <Image
                      data-tina-field={tinaField(item, "icon")}
                      src={item.icon}
                      fill
                      alt={"plus"}
                      quality={100}
                      objectFit="contain"
                    />
                  ) : (
                    <div
                      className={`min-[1561px]:w-[74px] min-[1561px]:h-[74px] xl:w-[64px] xl:h-[64px] w-[48px] h-[48px] md:rounded-min-[1561px] rounded-md mt-1 md:mt-0 flex items-center justify-center bg-[#8A8E8F14]`}
                    >
                      <div className={` ${styles.serialNo}`}> {index + 1}</div>
                    </div>
                  )}
                </div>

                <div>
                  {item?.title && (
                    <h1
                      data-tina-field={tinaField(item, "title")}
                      className={`${styles.heading}  ${
                        bgLight ? "text-black" : " text-[#E6ECED]"
                      }`}
                    >
                      {item?.title}
                    </h1>
                  )}
                  {item?.description && (
                    <p
                      data-tina-field={tinaField(item, "description")}
                      className={`${styles.desc} ${
                        cards.length > 4 && "max-w-[320px]"
                      } `}
                    >
                      {item?.description}
                    </p>
                  )}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Col>
    </div>
  );
});

export default OurSuperPowersComponent;
