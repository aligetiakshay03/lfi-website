import React, { useRef, useState } from "react";
import styles from "./hero.module.scss";
import ContentWithVideo from "../ContentWithVideo";
import { Carousel } from "antd";
import Slider from "../Slider";
import { tinaField } from "tinacms/dist/react";
import Button from "../../common/Button";
import { HomeHeroSectionSlider } from "../../tina/__generated__/types";

const HeroSection = ({
  imgSrc,
  videoSrc,
  fallbackSrc,
  data,
  sliderData,
  achievementList,
  awardsref,
}: any) => {
  const carouselRef: any = useRef();
  const [currentSlideIndex, setCurrentSlideIndex] = useState<any>(null);

  return (
    <>
      <div className={styles.container}>
        <ContentWithVideo
          imgSrc={imgSrc}
          videoSrc={videoSrc}
          fallbackSrc={fallbackSrc}
        >
          <Carousel
            fade
            dots={true}
            ref={carouselRef}
            autoplay={true}
            autoplaySpeed={4000}
            speed={1000}
            draggable
            onInit={() => setCurrentSlideIndex(0)}
            beforeChange={(index, newIndex) => {
              setCurrentSlideIndex(newIndex);
            }}
          >
            {data.map((item, idx) => {
              return (
                <div key={idx} className={styles.content_con}>
                  <div className={styles.content_container}>
                    <div>
                      {idx === 0 ? (
                        <h1
                          data-tina-field={tinaField(item, "title")}
                          className={styles.title}
                        >
                          {item?.title || ""}
                        </h1>
                      ) : (
                        <h2
                          data-tina-field={tinaField(item, "title")}
                          className={styles.title}
                        >
                          {item?.title || ""}
                        </h2>
                      )}

                      <div
                        data-tina-field={tinaField(item, "description")}
                        className={`${styles.desc} lf-bd-lg`}
                      >
                        {item?.description || ""}
                      </div>

                      <Button
                        tinaProps={{ data: item?.btn, labelText: "label" }}
                        text={item?.btn?.label}
                        bgColor="#FF7800"
                        className="2xl:w-[222px] 2xl:h-[68px] md:w-[171px] md:h-[48px] md:gap-3 w-[183px] h-[52px] hover:bg-opacity-50"
                        link={item?.btn?.link}
                        labelClass="2xl:text-[20px] 2xl:leading-[19.76px] font-['libre-franklin'] font-normal text-[16px] leading-[15.81px]"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>

          <div className={styles.sliderContainer}>
            <Slider sliderData={sliderData as HomeHeroSectionSlider[]} />
          </div>
        </ContentWithVideo>
      </div>
      <style jsx>{`
        .button {
          display: flex;
          justify-content: center;
          align-items: center;
          background: #ff7800;
          border-radius: 12px;
          font-size: 20px;
          text-wrap: nowrap;
        }

        .button:hover {
          background: #ff8c25;
        }

        .button:focus {
          background: #ff7800;
        }

        .btn_title {
          color: #f5f5f5;
          /* margin-right: 20px; */
        }

        @media screen and (max-width: 768px) {
          .button {
            padding: 18px 28px !important;
            width: 183px;
            height: 52px;
            font-weight: 400;
            font-size: 16px;
            line-height: 15px;
          }
          .btn_title {
            margin-right: 12px;
          }
        }

        @media screen and (max-width: 500px) {
          .button {
            width: 192px;
            height: 60px;
          }
        }
      `}</style>
    </>
  );
};
export default HeroSection;
