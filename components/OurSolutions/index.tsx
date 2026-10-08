import React from "react";
import styles from "./our-solutions.module.scss";
import Image from "next/image";
import orangearrow from "../../public/images/arrow-orange.png";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";

const OurSolutions = ({ ourSolutionData }) => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2
          data-tina-field={tinaField(ourSolutionData, "title")}
          className={styles.title}
        >
          {ourSolutionData.title}
        </h2>
        <p
          data-tina-field={tinaField(ourSolutionData, "subtitle")}
          className={styles.desc}
        >
          {ourSolutionData.subtitle}
        </p>
      </div>
      <div className={styles.detail_sec}>
        {ourSolutionData.details.map((item, idx) => {
          return (
            <>
              <div key={idx} className={styles.section}>
                <div className={styles.img_container}>
                  <Image
                    data-tina-field={tinaField(item, "image")}
                    src={item.image}
                    alt={"logo"}
                    layout="fill"
                  />
                </div>
                <div className={styles.description} >
                  <p
                    data-tina-field={tinaField(item, "description")}
                    className={styles.para}
                  >
                    {item.description}
                  </p>
                  <Link href={item.actionButton?.url ?? ""} className={styles.btn}>
                    <div
                      data-tina-field={tinaField(item.actionButton, "text")}
                      className="btn_title lf-btn font-['libre-franklin'] font-normal"
                    >
                      Read more
                    </div>
                    <Image
                      src={orangearrow}
                      priority={true}
                      alt="orange arrow"
                      width={14}
                    />
                  </Link>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default OurSolutions;
