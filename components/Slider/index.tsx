import React from "react";
import styles from "./slider.module.scss";
import { useState, useRef } from "react";
import { Image, Carousel } from "antd";
import { HomeHeroSectionSlider } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Link from 'next/link';

interface ISliderProps {
  sliderData: HomeHeroSectionSlider[];
}

const Slider = (props: ISliderProps) => {
  const { sliderData } = props;
  const sliderRef: any = useRef();

  const coloredimages = [
    { src: "/images/azure-svgrepo-com 1.svg", href:"https://portal.azure.com" },
    { src: "/images/microsoft-svgrepo-com 1.svg" ,href:"https://www.microsoft.com/en-in/?msockid=1c60a20f34c461fc1353b1cc35f56031"},
    { src: "/images/blueprism.svg" ,href:"https://www.blueprism.com/" },
    { src: "/images/automation-anywhere-vector.svg",href:"https://www.automationanywhere.com/" },
    { src: "/images/uipath-vector-logo 1.svg" , href:"https://www.uipath.com/"},
    { src: "/images/salesforce.svg",href:"https://www.salesforce.com/in/" },
    { src: "/images/Soterion logo.svg",href:"https://soterion.com/" },
    { src: "/images/oddo-svgrepo-.svg" , href:"https://www.odoo.com/"},
    {src: "/images/AWS_P_Logo.svg",href:"https://aws.amazon.com/free/?trk=16847e0c-46fb-467d-91ee-6e259e339665&sc_channel=ps&ef_id=:G:s&s_kwcid=AL!4422!10!72086958325164!72087482393523&msclkid=4c2d8a7749341cdcd932ece03a147043&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all"},


  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };


  return (
    <div className={styles.container}>
      <h3 className={styles.desc}>OUR PARTNERS</h3>
      <Carousel
        ref={sliderRef}
        className={styles.carousel_root}
        autoplay={true}
        speed={4000}
        autoplaySpeed={4000}
        centerMode={true}
        centerPadding="80px"
        swipeToSlide={true}
        draggable
        slidesToShow={5}
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
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
            },
          },
        ]}
      >
        {coloredimages?.map((data, index) => (
          <div key={index} className={styles.image_container}>
         {data.href ? (
              <Link href={data.href}  target="_blank">               
                  <Image
                    preview={false}
                    className={`${styles.image} ${hoveredIndex === index ? styles.colored_image : ""}`}
                    src={data.src}
                    alt={"image"}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  />                
              </Link>
            ) : (
              <Image
                preview={false}
                className={`${styles.image} ${hoveredIndex === index ? styles.colored_image : ""}`}
                src={data.src}
                alt={"image"}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              />
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
