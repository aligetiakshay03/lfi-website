import React, { forwardRef } from "react";
import styles from "./index.module.scss";
import HeaderComponent from "../../components/HeaderComponent";
import { Card, Col, Row } from "antd";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import Link from "next/link";
import orangearrow from "../../public/images/arrow-orange.png";

interface Iprops {
  status1?: string;
  heading1?: string;
  desc?: string | undefined | null;
  cards?: any;
  ref?: any;
  cardAlignment?: "center" | "left";
}

const HowCanWeHelpComponent = forwardRef<HTMLDivElement, Iprops>((props, ref) => {
  const { status1, heading1, cards, desc, cardAlignment } = props;

  return (
    <div  ref={ref}
      className={`${styles.container} ${
        cards[0].logo
          ? `bg-[url('/backgroud-images/how-can-we-help.jpg')]`
          : `bg-[#0a0a0a]`
        }`}
    >
      {status1 && ( 
        <div  data-tina-field={tinaField(props, "status1")}>
          <HeaderComponent title={status1} font={"font-['libre-franklin']"}/>
        </div>
      )}
      <h1  
        data-tina-field={tinaField(props, "heading1")}
        className={styles.header}
      >
        {heading1}
      </h1>
      <p data-tina-field={tinaField(props, "desc")} className={styles.desc}>
        {desc}
      </p>

      {props.cardAlignment == "left" ? (
        <Col className={styles.row} span={32}>
          <Row gutter={[48, 48]}>
            {cards.map((item, index) => (
              <Col key={index} xs={24} md={12} xl={8}>
                <Card
                  className={styles.cards}
                  bordered={false}
                  hoverable={true}
                >
                  
                  <div className="flex flex-col gap-5 md:gap-[28px] items-start">
                    {item.logo ? (
                      <div className="relative min-[1561px]:min-w-[64px] min-[1561px]:min-h-[64px] mt-1 min-w-[52px] min-h-[52px]">
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
                        className={`${styles.heading
                          } text-xl leading-[26px] font-['HelveticaNeueSmallBold'] ${item.logo
                            ? "md:text-xl md:leading-[21px] min-[1561px]:text-3xl min-[1561px]:leading-[33px}"
                            : "md:text-xl md:leading-[21px] min-[1561px]:text-4xl min-[1561px]:leading-[36px]"
                          }`}
                      >
                        {item.heading}
                      </h1>
                      <p
                        data-tina-field={tinaField(item, "content")}
                        className={styles.desc}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      ) : (
        <div className="flex gap-5 xl:gap-12 min-[1561px]:gap-16 flex-wrap mt-[30px] min-[1561px]:mt-[60px]">
          {cards.map((item, index) => (
            <Row key={index} className="max-[425px]:w-full">
              <Card
                className={styles.linkCards}
                bordered={false}
                hoverable={true}
              >
                <div className="flex flex-col gap-4 md:gap-9 items-center">
                  <div className="flex items-center gap-4 xl:gap-6 min-[1561px]:gap-9">
                    {item.logo ? (
                      <div className="relative min-w-[48px] min-h-[48px] xl:min-w-[64px] xl:min-h-[64px] mt-1">
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
                  <div className="flex flex-col gap-[16px] items-center text-center min-h-[106px] max-[1560px]-min-h-[90px] justify-between">
                    <h1
                      data-tina-field={tinaField(item, "heading")}
                      className={`${styles.heading
                        } text-xl leading-[26px] font-['MonsalGothicMedium'] ${item.logo
                          ? "md:text-xl md:leading-[21px] min-[1561px]:text-3xl min-[1561px]:leading-[33px}"
                          : "md:text-xl md:leading-[21px] min-[1561px]:text-4xl min-[1561px]:leading-[36px]"
                        }`}
                    >
                      {item.heading}
                    </h1>
                    {item.actionButton?.url && <Link
                      href={item.actionButton?.url ?? ""}
                      className={styles.btn}
                    >
                      <div
                        data-tina-field={tinaField(item.actionButton, "text")}
                        className="btn_title lf-btn font-['libre-franklin'] font-medium"
                      >
                        {item.actionButton.text}
                      </div>
                      <Image
                        src={orangearrow}
                        priority={true}
                        alt="orange arrow"
                        width={14}
                      />
                    </Link>}
                  </div>
                </div>
              </Card>
            </Row>
          ))}
        </div>
      )}
    </div>
  );
});

HowCanWeHelpComponent.displayName = 'HowCanWeHelpComponent';

export default HowCanWeHelpComponent;
