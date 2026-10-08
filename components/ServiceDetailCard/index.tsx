import Image from "next/image";
import React from "react";
import orangearrow from "../../public/images/arrow-orange.png";
import styles from "./service-detail-card.module.scss";
import { Button, Flex } from "antd";
import { ServicePageTabsProps } from "../../common/services/ServicePageTabs";
import {
  HomeOurServices,
  HomeOurServicesServiceTabs,
} from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";

interface ICardProps {
  data: HomeOurServices;
}

const ServiceDetailCard = ({ data }: ICardProps) => {
  return (
    <div className={styles.container}>
      
    </div>
  );
};

export default ServiceDetailCard;
