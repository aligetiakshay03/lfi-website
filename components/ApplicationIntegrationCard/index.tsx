import React from "react";
import styles from "./cards.module.scss";
import { Card, Col, Row } from "antd";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";

const ApplicationIntegrationCard = ({ vertical, arrData, cardTitleWidth, transParentCards=false }) => {
  return (
    <div className={styles.cardContainer}>
      <Row gutter={[48, 48]}>
        {arrData.map((item, index) => (
          <Col
            key={index}
            className="gutter-row"
            xs={12}
            sm={8}
            lg={vertical ? 12 : 8}
          >
            <Card className={`${styles.cards} ${transParentCards ? styles.transparentCards : styles.backgroundCards}`} bordered={false} hoverable={true}>
              <div className="flex flex-col md:flex-row gap-5 items-start">
                <div className="relative min-[1561px]:min-w-[64px] min-[1561px]:min-h-[64px] mt-1 lg:min-w-[54px] lg:min-h-[54px] h-[38px] w-[38px]">
                  <Image
                    data-tina-field={tinaField(item, "icon")}
                    src={item.icon}
                    fill
                    alt={"plus"}
                    quality={100}
                    objectFit="cover"
                  />
                </div>
              </div>
              <h1
                data-tina-field={tinaField(item, "title")}
                className={styles.title+` ${!cardTitleWidth ? styles.titleWidth: styles.titleWidthFull}`}
              >
                {item.title}
              </h1>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ApplicationIntegrationCard;
