"use client";
import React, { forwardRef, useEffect } from "react";
import styles from "./persistentlyInnovative.module.scss";
import { Col, Row } from "antd";
import CountUp from "react-countup";
import {
  PersistentlyInnovativeAnalytics,
  PersistentlyInnovativeQuery,
} from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import HeaderComponent from "../../components/HeaderComponent";

interface PersistentlyInnovativeBlockProps {
  ref:any;
  persistentlyInnovativeData: PersistentlyInnovativeQuery;
}

// const PersistentlyInnovativeBlock: React.FC<
//   PersistentlyInnovativeBlockProps
// > = ({ persistentlyInnovativeData} ,ref) => {

const PersistentlyInnovativeBlock = forwardRef<HTMLDivElement, PersistentlyInnovativeBlockProps>(({ persistentlyInnovativeData }, ref) => {

  
  return (
    <div className={styles.container}>
      <section ref={ref} className={styles.sec1}>
        <div
          data-tina-field={tinaField(
            persistentlyInnovativeData.persistentlyInnovative,
            "status"
          )}
        >
          <HeaderComponent
            title={persistentlyInnovativeData.persistentlyInnovative?.status}
            font={"font-['libre-franklin']"}
          />
        </div>
        <div className={styles.header}>
          <h3
            data-tina-field={tinaField(
              persistentlyInnovativeData.persistentlyInnovative,
              "title"
            )}
            className={styles.sec1_heading}
          >
            {persistentlyInnovativeData.persistentlyInnovative?.title}
          </h3>
          <p
            data-tina-field={tinaField(
              persistentlyInnovativeData.persistentlyInnovative,
              "description"
            )}
            className={styles.sec1_desc}
          >
            {persistentlyInnovativeData.persistentlyInnovative?.description}
          </p>
        </div>
      </section>
      <Row className={styles.sec2} gutter={[16, 16]}>
        {persistentlyInnovativeData.persistentlyInnovative?.analytics?.map(
          (item, index) => (
            <Col key={index} xs={4} md={6} className={styles.cols}>
              <section className={styles.sec2_item}>
                <h2
                  data-tina-field={tinaField(
                    item as PersistentlyInnovativeAnalytics,
                    "time"
                  )}
                  className={styles.sec2_title}
                >
                  <CountUp
                    end={Number(item?.time)}
                    duration={6}
                    suffix={`${item?.suffix}`}
                    enableScrollSpy={true}
                  />
                </h2>
                <p
                  data-tina-field={tinaField(
                    item as PersistentlyInnovativeAnalytics,
                    "description"
                  )}
                  className={styles.sec2_desc}
                >
                  {item?.description}
                </p>
              </section>
            </Col>
          )
        )}
      </Row>
    </div>
  );
});

export default PersistentlyInnovativeBlock;
