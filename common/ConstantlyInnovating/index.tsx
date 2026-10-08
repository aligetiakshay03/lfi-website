"use client";
import React, { forwardRef } from "react";
import styles from "./constantly-innovating.module.scss";
import Image from "next/image";
import { Col, Row } from "antd";
import {
  ConstantlyInnovatingImageBlock,
  ConstantlyInnovatingQuery,
} from "../../tina/__generated__/types";
import HeaderComponent from "../../components/HeaderComponent";
import IndustriesCard from "../IndustriesCard";
import { tinaField } from "tinacms/dist/react";

interface IConstantlyInnovatingProps {
  ref: any;

  constantlyInnovatingData: ConstantlyInnovatingQuery;
}

// const ConstantlyInnovatingBlock: React.FC<IConstantlyInnovatingProps> = ({constantlyInnovatingData},ref) => {

const ConstantlyInnovatingBlock = forwardRef<HTMLDivElement, IConstantlyInnovatingProps>(({ constantlyInnovatingData }, ref) => {



  const { status, title, description, imageBlock } =
    constantlyInnovatingData?.constantlyInnovating;

  return (
    <div   className={styles.container}>
      <div  ref={ref}
        data-tina-field={tinaField(
          constantlyInnovatingData.constantlyInnovating,
          "status"
        )} 
      >
        <HeaderComponent title={status} font={"font-['libre-franklin']"}/>
      </div>
      <h2  
        data-tina-field={tinaField(
          constantlyInnovatingData.constantlyInnovating,
          "title"
        )}
        className={styles.heading}
      >
        {title}
      </h2>
      <p
        data-tina-field={tinaField(
          constantlyInnovatingData.constantlyInnovating,
          "description"
        )}
        className={styles.desc}
      >
        {description}
      </p>
      <IndustriesCard imageBlock={imageBlock} />
    </div>
  );
});

export default ConstantlyInnovatingBlock;
