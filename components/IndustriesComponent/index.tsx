import React, { useRef } from "react";
import styles from "./industries.module.scss";
import { Carousel } from "antd";
import Image from "next/image";
import Link from "next/link";
import orangearrow from "../../public/images/arrow-orange.png";
import { NoNameBtn } from "../Button/Button";
import { HomeIndustry } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";

interface IIndustriesProps {
  industriesData: HomeIndustry[];
}

const IndustryCardText = {
  description:
    "We have rich experience in your industry. We also share insights across industries to help you uncover new opportunities to adapt and disrupt.",
};

const Industries = ({ industriesData }: IIndustriesProps) => {
  const sliderRef: any = useRef();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.heading}>Industries</h2>
        <p className={styles.carouseldesc}>{IndustryCardText.description}</p>

        <Carousel
          ref={sliderRef}
          pauseOnHover={true}
          waitForAnimate={true}
          className={styles.carousel_root}
          autoplay={true}
          speed={1500}
          autoplaySpeed={2500}
          centerMode={true}
          centerPadding="0px"
          swipeToSlide={false}
          slidesToShow={4}
          infinite={true}
          dots={false}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 840,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 425,
              settings: {
                slidesToShow: 1,
                dots: true,
              },
            },
          ]}
        >
          {industriesData?.map((data, ind) => (
            <div key={ind} className={styles.slider}>
              <Link href={data?.actionButton?.url ?? ""}>
                <div className={styles.image_container}>
                  <Image
                    data-tina-field={tinaField(data, "backgroundImage")}
                    className={styles.image}
                    src={data?.backgroundImage || ""}
                    alt={data?.title as string}
                    width={480}
                    height={700}
                  />
                </div>
                <div className={styles.detail}>
                  <h3
                    data-tina-field={tinaField(data, "title")}
                    className={styles.title}
                  >
                    {data.title}
                  </h3>
                  <p
                    data-tina-field={tinaField(data, "description")}
                    className={styles.desc}
                  >
                    {data.description}
                  </p>
                  <div className={styles.btn}>
                    <p
                      data-tina-field={
                        data?.actionButton &&
                        tinaField(data?.actionButton, "text")
                      }
                    >
                      {data?.actionButton?.text}
                    </p>
                    <Image
                      src={orangearrow}
                      priority={true}
                      alt="arrow"
                      width={14}
                    />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
      <div className={`${styles.button_con}`}>
        <NoNameBtn
          theme="dark"
          onClick={() => sliderRef.current.prev()}
          className={styles.prevBtn}
        />
        <NoNameBtn
          theme="dark"
          onClick={() => sliderRef.current.next()}
          className={styles.nextBtn}
        />
      </div>
    </div>
  );
};

export default Industries;
