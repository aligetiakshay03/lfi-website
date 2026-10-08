import React, { forwardRef } from "react";
import styles from "./whatweoffer.module.scss";
import HeaderComponent from "../../components/HeaderComponent";
import { Col, Row } from "antd";
import ApplicationIntegrationCard from "../../components/ApplicationIntegrationCard";
import { tinaField } from "tinacms/dist/react";

// const WhatWeOffer = ({ data, transparentCards = false }) => {

  const WhatWeOffer = forwardRef<HTMLDivElement, { data ?, transparentCards? }>(
    ({ data, transparentCards = false }, ref) => {

  // const WhatWeOffer = forwardRef<HTMLDivElement>(({ data, transparentCards = false }, ref) => {

  return (
    <div  ref={ ref} className={styles.container}>
      <Row className={styles.gap}>
        <Col
          className={styles.row}
          xs={24}
          // xl={data.description ? (data.list && data.list.length ? 11 : 6) : 11}
          xl={(data.description || (data.list && data.list.length)) ? 11 : 6}
        >
          <div  data-tina-field={tinaField(data, "heading")}>
            <HeaderComponent title={data.heading} font={"font-['libre-franklin']"}/>
          </div>
          <h1
            data-tina-field={tinaField(data, "title")}
            className={
              styles.heading + ` ${data?.list?.length || data.description ? "" : " max-w-[398px]"} ${transparentCards && "w-full"}`
            }
          >
            {data.title}
          </h1>
          <p className="text-[#A4A8A9] 2xl:text-[28px] lg:text-[20px] text-[16px] font-['HelveticaNeueSmallBold'] mt-8">{data.description}</p>
          <ul className="mt-8 list-disc md:pl-10 pl-5">
            {data.list &&
              data.list.length &&
              data.list.map((item, index) => (
                <li
                  data-tina-field={tinaField(data, "list")}
                  className={styles.listItems}
                  key={index}
                >
                  {item}
                </li>
              ))}
          </ul>
        </Col>
        <Col
          className={styles.row}
          xl={(data.description || (data.list && data.list.length)) ? 11 : 16}
        >
          <ApplicationIntegrationCard
            arrData={data.cardsData}
            vertical={(data.list && data.list.length) || data.description}
            cardTitleWidth={data.description}
            transParentCards={transparentCards}
          />
        </Col>
      </Row>
    </div>
  );
});

export default WhatWeOffer;
