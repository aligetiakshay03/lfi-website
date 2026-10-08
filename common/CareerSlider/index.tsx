import { Button, Carousel } from 'antd'
import Image from 'next/image'
import React from 'react'
import styles from './index.module.scss'
import { tinaField } from 'tinacms/dist/react'
import Link from 'next/link'
import whitearrow from "../../public/images/arrow.png";


const CareerSlider = (props) => {
  const { heading, button, images } = props
  
  return (
    <div className={styles.outerContainer}>
      <div>
        <h1 data-tina-field={tinaField(props, "heading")} className={styles.heading}>{heading}</h1>
        <Link href={button.action} target="_blank">
        <Button data-tina-field={tinaField(props, "label")} className={styles.button} > {button.buttonLabel} <Image
            src={whitearrow}
            priority={true}
            alt="white arrow"
            width={14}
            height={14}
          /></Button>
        </Link>
      </div>
      <div className={styles.container}>
        <Carousel
          autoplay
          dots={false}
          effect="scrollx"
          autoplaySpeed={2000}
          slidesToScroll={1}
          slidesToShow={4}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 390,
              settings: {
                slidesToShow: 1,
              },
            }
          ]}
          pauseOnHover={true}
          className="custom-carousel"
        >
          {images.map((item, index) => {
            return (
              <div data-tina-field={tinaField(item, "image")} key={index} className={`h-[281px] ${index !== 0 ? "mr-[20px]" : ""} ${!(index % 2 === 0) ? "md:!w-[281px] md:!h-[281px]" : "md:!w-[579px] md:!h-[411px] sm:mr-[30px]"}`}>
                <Image className={`object-cover h-[281px] w-[281px] ${!(index % 2 === 0) ? "md:!w-[281px] md:!h-[281px]" : "md:!w-[579px] md:!h-[411px]"} rounded-[32px]`} src={item.image} alt={item.image} width={1000} height={1000} />              </div>
            )
          })}
        </Carousel>
      </div>
    </div>
  )
}

export default CareerSlider