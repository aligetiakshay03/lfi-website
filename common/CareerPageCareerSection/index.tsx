import React from 'react'
import { CareersPageLetsBeFriends, CareersPageNextLevelCareer } from '../../tina/__generated__/types';
import styles from './index.module.scss'
import { tinaField } from 'tinacms/dist/react';
import whitearrow from "../../public/images/arrow.png";
import Image from 'next/image';
import { Button } from 'antd';
import HeaderComponent from '../../components/HeaderComponent';

const CareerPageCareerSection = (careers:  CareersPageNextLevelCareer | CareersPageLetsBeFriends) => {
    const careersData = careers;
    return (
      <>
        <div className={styles.container+` ${careersData?.background?'bg-[url("/backgroud-images/careers.jpg")]':''}`}>
          <div className={styles.title} data-tina-field={tinaField(careersData, "status")}>
            <HeaderComponent title={careersData.status} font={"font-['libre-franklin']"} />
          </div>
          <h1
            data-tina-field={tinaField(careersData, "title")}
            className={styles.desc}
          >
            {careersData.title}
          </h1>
          <p data-tina-field={tinaField(careersData, "description")} className={styles.para}>{careersData.description}</p>
          <Button
            style={{background:`${careersData.actionButton?.bgColor}`}}
            className={styles.button}
            href={careersData.actionButton?.url ?? ""}
          >
            <div
              data-tina-field={
                careersData?.actionButton &&
                tinaField(careersData?.actionButton, "text")
              }
              className="btn_title lf-btn"
            >
              <p>{careersData.actionButton?.text}</p>
            </div>
            <Image
                src="/images/linkedin.svg"
                alt="linfields-logo"
                width={22}
                height={22}
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
  
  export default CareerPageCareerSection;