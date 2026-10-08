import React, { useEffect, useRef, useState } from "react";
import styles from "./our-journey.module.scss";
import Image from "next/image";
import orangearrow from "../../public/images/arrow-orange.png";
import { Col, Row } from "antd";
import CountUp from "react-countup";
import { tinaField } from "tinacms/dist/react";
import { HomeOurJourney, HomeOurJourneyAnalytics } from "../../tina/__generated__/types";
import HeaderComponent from "../HeaderComponent";
import Button from "../../common/Button";

interface IJourneyProps {
  journeyData: HomeOurJourney;
}

const OurJourney = ({ journeyData }: IJourneyProps) => {
  const [screenSize, setScreenSize] = useState<string>("mob");
  const handleScreenSize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 769) {
      setScreenSize("desktop");
    } else if (windowWidth >= 500) {
      setScreenSize("tablet");
    } else {
      setScreenSize("mob");
    }
  };

  useEffect(() => {
    handleScreenSize();

    window.addEventListener("resize", handleScreenSize);
    return () => {
      window.removeEventListener("resize", handleScreenSize);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
      <div className={styles.sec1}>
        <h2 data-tina-field={tinaField(journeyData, 'title')} className={styles.sec1_heading}>
          {journeyData.title}
        </h2>
        <p data-tina-field={tinaField(journeyData, 'description')} className={styles.sec1_desc}>{journeyData.description}</p>
      </div>
      <Row className={styles.sec2} gutter={[16, 16]}>
        {journeyData?.analytics?.map((item:HomeOurJourneyAnalytics, index) => (
          <Col
            key={index}
            span={
              screenSize === "tablet" ? 6 : screenSize === "desktop" ? 12 : 12
            }
          >
            <div className={styles.sec2_item}>
              <h3 data-tina-field={item && tinaField(item, 'time')} className={styles.sec2_title}>
                <CountUp
                  end={item?.time?(typeof(item?.time)==='number'?item.time:Number(item.time)):0}
                  duration={4}
                  suffix={item?.suffix || ''}
                  enableScrollSpy={true}
                />
              </h3>
              <p data-tina-field={item && tinaField(item, 'description')} className={styles.sec2_desc}>{item?.description}</p>
            </div>
          </Col>
        ))}
      </Row>
      </div>
    </div>
  );
};

export default OurJourney;
