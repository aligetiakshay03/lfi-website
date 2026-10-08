import React, { forwardRef, useRef, useState } from "react";
import styles from "./awards.module.scss";
import { Carousel, Col, Row } from "antd";
import Image from "next/image";
import orangearrow from "../../public/images/arrow-orange.png";
import { HomeAwardsAndRecognition } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Button from "../../common/Button";
import Link from 'next/link'


interface IAwardsAndRecognitionsProps {
  awardsAndRecognitionsData: HomeAwardsAndRecognition[];
  ref: any;
}

const AwardsAndRecognitions = forwardRef<HTMLDivElement, IAwardsAndRecognitionsProps>(({
  awardsAndRecognitionsData,
}, ref) => {



  const carouselRef: any = useRef();
  const [currentSlideIndex, setCurrentSlideIndex] = useState<any>(null);

  return (
    <div ref={ref} className={styles.container}>
      <Carousel
        fade
        dots={true}
        ref={carouselRef}
        autoplay={true}
        autoplaySpeed={3000}
        speed={1000}
        draggable
        onInit={() => setCurrentSlideIndex(0)}
        beforeChange={(index, newIndex) => {
          setCurrentSlideIndex(newIndex);
        }}
      >
        {awardsAndRecognitionsData.map((item, index) => {
          return (
            <>
              <Row key={index} className={styles.section}>
                <Col className={styles.detail_sec}>
                  <h2 data-tina-field={tinaField(item, 'title')} className={styles.title}>{item.title}</h2>
                  <p data-tina-field={tinaField(item, 'description')} className={styles.desc}>{item.description}</p>
                  {item.actionButton?.url && (
                    <Link href={item.actionButton.url}>
                      <Button tinaProps={{ data: item?.actionButton, labelText: "text" }} text="Read more" icon={orangearrow} className="2xl:w-[195px] 2xl:h-[68px] md:w-[151px] md:h-[48px] max-md:hidden" bgColor="transparent" borderColor="#FF7800" labelClass="2xl:text-[20px] text-[#FF7800] 2xl:leading-[19.76px] font-['libre-franklin'] font-normal md:text-[16px] md:leading-[15.81px]" />

                    </Link>
                  )}
                  {item.actionButton?.url && (
                    <div className="flex justify-center">
                      <Link href={item.actionButton.url}>
                        <Button tinaProps={{ data: item?.actionButton, labelText: "text" }} text="Read more" icon={orangearrow} className="md:hidden" bgColor="transparent" labelClass="text-[#FF7800] font-['libre-franklin'] font-medium text-[16px] leading-[15.81px]" />

                      </Link>
                    </div>
                  )}

                </Col>
                <Col data-tina-field={tinaField(item, 'image')} className={styles.img_sec}>
                  <Image
                    src={item.image || ""}
                    layout="fill"
                    objectFit="scale-down"
                    className="object-center lg:object-right"
                    alt="certification_logo"
                  />
                </Col>
              </Row>
            </>
          );
        })}
      </Carousel>
    </div>
  );
});

AwardsAndRecognitions.displayName = "AwardsAndRecognitions";

export default AwardsAndRecognitions;
