import { Col, Row } from "antd";
import React from "react";
import Image from "next/image";
import styles from "./index.module.scss";
import { tinaField } from "tinacms/dist/react";
import { ConstantlyInnovatingImageBlockMutation } from "../../tina/__generated__/types";

interface ImageBlock {
  title?: string | null | undefined;
  cardImage?: string | null | undefined;
}

interface IIndustriesCardProps {
  imageBlock?: (ImageBlock | null)[] | null | undefined;
}

const IndustriesCard = ({ imageBlock }: IIndustriesCardProps) => {
  return (
    <div className={styles.img_container}>
      {imageBlock?.map((image, index) => (
        <div key={index} className={styles.img_card}>
          <div className={styles.img_text}>
            <h3
              data-tina-field={tinaField(
                image as ConstantlyInnovatingImageBlockMutation,
                "title"
              )}
              className={styles.title}
            >
              {image?.title}
            </h3>
            <div className={styles.divider}></div>
          </div>
          <div
            className="w-[100%] h-[158px]"
            data-tina-field={tinaField(
              image as ConstantlyInnovatingImageBlockMutation,
              "cardImage"
            )}
          >
            <Image
              src={`${image?.cardImage}`}
              alt={`${image?.title}`}
              fill
              className={styles.img}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default IndustriesCard;
