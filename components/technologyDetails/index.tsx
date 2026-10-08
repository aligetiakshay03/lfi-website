import React, { forwardRef } from "react";
import styles from "./index.module.scss";
import { Card, Col, Row } from "antd";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
interface Iprops {
  logo?: string | null | undefined;
  heading1?: string | undefined;
  desc?: string | null | undefined;
  cards?: any;
}
  const TechnologyDetailsComponent = forwardRef<HTMLDivElement, Iprops>((props, ref) => {
  const { logo, heading1, cards, desc } = props;
  return (
    <div ref={ref}
      className={`${styles.container} ${
        cards[0].logo
          ? `bg-[url('/backgroud-images/whats-in-it-for-you.jpg')]`
          : `bg-[#0a0a0a]`
      }`}
    >
      <div className="xl:max-w-[190px] 2xl:max-w-[285px]">
        <div
          data-tina-field={tinaField(props, "logo")}
          className="relative w-52 md:max-w-[284px] h-20"
        >
          <Image src={`${logo}`} alt="logo" fill objectFit="contain" />
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
      </div>
      <Col
        className={`${styles.row} ${
          cards.length > 3 ? "grid lg:grid-cols-2" : "flex flex-col"
        }`}
      >
        {cards.map((item, index: number) =>
          cards.length > 3 ? (
            <>
              <Card
                key={index}
                className={styles.cards}
                bordered={false}
                hoverable={true}
              >
                <div className="flex flex-col gap-4 md:gap-0 items-start justify-start">
                  <div className="flex items-center gap-4 xl:gap-6 2xl:gap-9">
                    {item.logo ? (
                      <div className="relative min-w-[48px] min-h-[48px] mt-1">
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
                    <h1
                      data-tina-field={tinaField(item, "heading")}
                      className={`${
                        styles.heading
                      } text-xl leading-[26px] font-['libre-franklin'] font-medium ${
                        item.logo
                          ? "md:text-xl md:leading-[21px] 2xl:text-[24px] 2xl:leading-[33px}"
                          : "md:text-xl md:leading-[21px] 2xl:text-4xl 2xl:leading-[36px]"
                      }`}
                    >
                      {item.heading}
                    </h1>
                  </div>
                  <p
                    data-tina-field={tinaField(item, "content")}
                    className={`${styles.desc} mt-4`}
                  >
                    {item.content}
                  </p>
                </div>
              </Card>
            </>
          ) : (
            <>
              <Card
                key={index}
                className={styles.cards}
                bordered={false}
                hoverable={true}
              >
                <div className="flex gap-5 md:gap-[30px] 2xl:gap-9 items-center">
                  {item.logo ? (
                    <div className="relative 2xl:min-w-[64px] 2xl:min-h-[64px] mt-1 min-w-[52px] min-h-[52px]">
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
                  <div>
                    <h1
                      data-tina-field={tinaField(item, "heading")}
                      className={`${
                        styles.heading
                      } text-xl leading-[26px] font-['libre-franklin'] font-medium ${styles.headingSize} ${
                        item.logo
                          ? "md:text-xl md:leading-[21px] 2xl:text-3xl 2xl:leading-[33px}"
                          : "md:text-xl md:leading-[21px] 2xl:text-4xl 2xl:leading-[36px]"
                      }`}
                    >
                      {item.heading}
                    </h1>
                    <p
                      data-tina-field={tinaField(item, "content")}
                      className={`${styles.desc} ${styles.textColor} mt-3 md:mt-[28px]`}
                    >
                      {item.content}
                    </p>
                  </div>
                </div>
              </Card>
            </>
          )
        )}
      </Col>
    </div>
  );
});
TechnologyDetailsComponent.displayName = "TechnologyDetailsComponent";
export default TechnologyDetailsComponent;
