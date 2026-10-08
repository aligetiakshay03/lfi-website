import React from "react";
import styles from "../../components/Benefits/benefits.module.scss"
import { IContactUsProps } from "../../interfaces/contactUs";
import { tinaField, useTina } from "tinacms/dist/react";
import HeaderComponent from "../../components/HeaderComponent";
import { CareersPageOurPresence } from "../../tina/__generated__/types";

const OurPresence = (props) => {
//   const { data: benefits } = useTina(props.data);
  const benefitsData = props.data;

  return (
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <HeaderComponent title={benefitsData.status} font={"font-['libre-franklin']"}/>
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
                <div className={styles.cards} key={idx}>
                  <h3
                    className="text-[#E6ECED] text-2xl 2xl:text-4xl"
                    data-tina-field={item && tinaField(item, "country")}
                  >
                    {item?.country}
                  </h3>
                  <div className="text-[#8A8E8F] text-base md:text-lg 2xl:text-2xl font-['libre-franklin'] font-normal">
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
                  <div className="text-[#8A8E8F] text-base md:text-lg 2xl:text-2xl font-['libre-franklin'] font-normal xl:pt-2">
                    <p data-tina-field={item && tinaField(item, "pinCode")}>
                      {" "}
                      {item?.pinCode}
                    </p>
                    <p
                      data-tina-field={
                        item && tinaField(item, "countryfullName")
                      }
                    >
                      {item?.countryfullName
                        ? item?.countryfullName
                        : item?.country}
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OurPresence;
