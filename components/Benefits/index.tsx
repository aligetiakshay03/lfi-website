import React from "react";
import HeaderComponent from "../HeaderComponent";
import styles from "./benefits.module.scss";
import { IContactUsProps } from "../../interfaces/contactUs";
import { tinaField, useTina } from "tinacms/dist/react";
import Link from "next/link";
import Image from "next/image";

import orangearrow from "../../public/images/arrow-orange.png";
import Button from "../../common/Button";


const Benefits = (props: { data: IContactUsProps }) => {
  const { data: benefits } = useTina(props.data);
  const benefitsData = benefits.contactUsPage;

  return (
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <HeaderComponent title={benefitsData.status} font={"font-['libre-franklin']"} />
        <h2
          className={styles.heading}
          data-tina-field={tinaField(benefitsData, "title")}
        >
          {benefitsData.title}
        </h2>
        <div
          className={`bg-[url('/backgroud-images/location-world-map.jpg')] bg-no-repeat bg-contain xl:bg-contain w-full my-4 2xl:my-12 ${styles.mapImage}`}
        ></div>
        <div className={styles.cardContainer}>
          {benefitsData.locationCard?.map((item, idx) => {

            return (

              <>
                {/* {
                  item && item.actionButton && item?.actionButton?.url && item.actionButton.labelText && ( */}

                <div className={styles.cards} key={idx}>
                  <Link href={item?.actionButton?.url || ""} target="_blank" className={styles.cardLink} >
                    <div className={styles.imageContainer}>
                      {item?.imageUrl && (
                        <Image
                          src={item.imageUrl}
                          alt="image"
                          width={72}
                          height={72}
                        />
                      )}
                    </div>

                    <div className={styles.ContentContainer}>

                      <h3
                        className="text-[#E6ECED] text-2xl 2xl:text-4xl font-['HelveticaNeueSmall']"
                        data-tina-field={item && tinaField(item, "country")}
                      >
                        {item?.country}
                      </h3>
                      <div className="text-[#8A8E8F] text-base md:text-lg 2xl:text-2xl font-['HelveticaNeueSmallBold']">
                        <p data-tina-field={item && tinaField(item, "building")}>
                          {" "}
                          {item?.building}
                        </p>
                        <p data-tina-field={item && tinaField(item, "landmark")}>
                          {" "}
                          {item?.landmark}
                        </p>
                        <p data-tina-field={item && tinaField(item, "city")}>
                          {" "}
                          {item?.city}
                        </p>
                      </div>
                      <div className="text-[#8A8E8F] text-base md:text-lg 2xl:text-2xl font-['HelveticaNeueSmallBold'] xl:pt-2">
                        <p data-tina-field={item && tinaField(item, "pinCode")}>
                          {" "}
                          {item?.pinCode}
                        </p>

                        {/* <p
                      data-tina-field={
                        item && tinaField(item, "countryfullName")
                      }
                    >
                      {item?.countryfullName
                        ? item?.countryfullName
                        : item?.country}
                    </p> */}
                      </div>
                      <div>


                        {
                          item && item.actionButton && item?.actionButton?.url && item.actionButton.labelText && (
                            <Button
                              text={item.actionButton.labelText}
                              icon={orangearrow}
                              className=""
                              bgColor="transparent"
                              labelClass="text-[#FF7800] font-['libre-franklin'] font-medium text-[18px] leading-[15.81px]"
                            // labelClass="max-2xl:text-[16px] text-[#FF7800] 2xl:leading-[19.76px] font-['libre-franklin'] font-normal md:text-[14px] md:leading-[15.81px]"
                            />
                          )}
                      </div>
                    </div>
                  </Link>


                </div>

              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
