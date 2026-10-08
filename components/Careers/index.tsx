import React from "react";
import styles from "./careers.module.scss";
import Image from "next/image";
import whitearrow from "../../public/images/arrow.png";
import { Button } from "antd";
import { HomeCarrers } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";

const Careers = (careers: HomeCarrers) => {
  const careersData = careers;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
        </div>
        <h3
          data-tina-field={tinaField(careersData, "description")}
          className={styles.desc}
        >
          {careersData.description}
        </h3>
        <Button
          className={styles.button}
          href={careersData.actionButton?.url ?? ""}
        >
          <div
            data-tina-field={
              careersData?.actionButton &&
              tinaField(careersData?.actionButton, "text")
            }
            className="btn_title lf-btn font-['libre-franklin'] font-medium"
          >
            <p>{careersData.actionButton?.text}</p>
          </div>
          <Image
            src={whitearrow}
            priority={true}
            alt="white arrow"
            width={14}
            height={14}
          />
        </Button>
      </div>
      <style jsx>{`
        .button {
          display: flex;
          justify-content: center;
          align-items: center;
          background: #ff7800;
          border-radius: 12px;
          width: 212px;
          height: 70px;
          font-weight: 600;
          font-size: 20px;
        }

        .button:hover {
          background: #ff8c25;
        }

        .button:focus {
          background: #ff7800;
        }

        .btn_title {
          color: #f5f5f5;
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

export default Careers;
