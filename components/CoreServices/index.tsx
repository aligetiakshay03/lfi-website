import React from "react";
import styles from "./styles.module.scss";
import { Card, Col } from "antd";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";

const CoreServicesComponent = (props) => {
  const { heading1, cards, desc } = props;

  return (
    <div className={`${styles.container} bg-[#0a0a0a]`}>
      <div className=" w-full min-[1561px]:w-[45%] xl:w-[36%]">
        <h1
          data-tina-field={tinaField(props, "heading1")}
          className={styles.header}
        >
          {heading1}
        </h1>
        <p data-tina-field={tinaField(props, "desc")} className={styles.desc}>
          {desc}
        </p>
      </div>

      <Col
        className={`${styles.row} "grid lg:grid-cols-2 w-full xl:w-[48%] pt-[16px]"`}
      >
        {cards.map((item, index: number) => (
          <Card
            key={index}
            className={styles.cards}
            bordered={false}
            hoverable={true}
          >
            <div className="flex  min-[1561px]:gap-[42px] gap-9 items-start justify-start">
              <div className="flex items-center gap-4 xl:gap-6 2xl:gap-9">
                {item.logo ? (
                  <div className="relative min-w-[48px] min-h-[48px] xl:min-w-[64px] xl:min-h-[64px] min-[1561px]:[84px] min-[1561px]:[84px] mt-1">
                    <Image
                      data-tina-field={tinaField(item, "logo")}
                      src={item.logo}
                      fill
                      alt={"plus"}
                      quality={100}
                      objectFit="contain"
                    />
                  </div>
                ) : null}
              </div>
              <div>
                <h1
                  data-tina-field={tinaField(item, "heading")}
                  className={`${
                    styles.heading
                  } text-xl leading-[26px] font-['libre-franklin'] font-medium ${
                    item.logo
                      ? "md:text-xl md:leading-[21px] 2xl:text-3xl 2xl:leading-[33px}"
                      : "md:text-xl md:leading-[21px] 2xl:text-4xl 2xl:leading-[36px]"
                  }`}
                >
                  {item.heading}
                </h1>
                <p
                  data-tina-field={tinaField(item, "content")}
                  className={`${styles.desc} mt-4`}
                >
                  {item.content}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </Col>
    </div>
  );
};

export default CoreServicesComponent;
