import React, { forwardRef } from "react";
import styles from "./index.module.scss";
import HeaderComponent from "../../components/HeaderComponent";
import { Card, Col, Row } from "antd";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
// import { TinaMarkdown } from "tinacms/dist/rich-text";



interface Iprops {
    status1?: string;
    heading1?: string;
    desc?: string | undefined | null;
    cards?: any;
    ref?: any;
}

// const RPAFlowCardSection = (props: Iprops) => {
const RPAFlowCardSection = forwardRef<HTMLDivElement, Iprops>((props, ref) => {
    const { status1, heading1, cards, desc } = props;
    return (
        <div ref={ref}
            className={`${styles.container} ${cards[0].logo
                ? `bg-[url('/backgroud-images/our-service.jpg')]`
                : `bg-[#0a0a0a]`
                }`}
        >
            <div data-tina-field={tinaField(props, "status1")}>
                <HeaderComponent title={status1} font={"font-['libre-franklin']"} />
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
            <Col className={styles.row} span={32}>
                <Row gutter={[48, 48]}>
                    {cards.map((item, index) => (
                        <Col key={index} xs={24} md={12} xl={8}>
                            <Card className={styles.cards} bordered={false} hoverable={true}>
                                <div className="flex flex-col md:flex-row gap-5 items-start">
                                    {item.logo ? (
                                        <div className="relative min-[1561px]:min-w-[74px] min-[1561px]:min-h-[74px] mt-1 min-w-[52px] min-h-[52px]">
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
                                            <TinaMarkdown
                                                content={item.content}
                                                components={{
                                                    li: (descriptions) => (
                                                        <li className="ml-[10px] max-[769px]:ml-[7px]" >

                                                            <div className='flex flex-row'>
                                                                <span

                                                                    style={{ marginRight: "8px" }}
                                                                >
                                                                    •
                                                                </span>
                                                                <div >{descriptions?.children}</div>
                                                            </div>
                                                        </li>
                                                    ),
                                                }}
                                            />
                                            {/* {item.content} */}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Col>
        </div>
    );
});

export default RPAFlowCardSection;
