import React, { forwardRef } from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import HeaderComponent from "../../components/HeaderComponent";
import {
  CloudConsultingPageMediaSection,
  DigitalTransformationDigitalEvolutionMediaSection,
  DigitalTransformationDigitalEvolutionMediaSectionFilter,
  DigitalTransformationMediaSection,
  KubernetesServicesMediaSection,
  ProductDiscoveryMediaSection,
  SolutionDiscoveryMediaSection,
} from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";

interface IMediaSectionProps {
  data: DigitalTransformationDigitalEvolutionMediaSection;
  ref :any;
}

// const DigitalEvolutionSection = ({ data }: IMediaSectionProps) => {
  const DigitalEvolutionSection = forwardRef<HTMLDivElement, IMediaSectionProps>(({ data }, ref) => {
  return (
    <div className={styles.container}>
      <div className="flex flex-col md:flex-row w-full items-center ">
        <div className={styles.contentSec}>
          <div ref={ref}  data-tina-field={tinaField(data, "status")}>
            <HeaderComponent title={data?.status} font={"font-['libre-franklin']"}/>
          </div>
          <h2
            data-tina-field={tinaField(data, "title")}
            className={styles.title}
          >
            {data?.title}
          </h2>
          {/* <p className={styles.description}>{data?.description}</p> */}
        </div>
        <div className={styles.imageSec}>
          {data?.imageURL && (
            <Image src={data?.imageURL} alt="" fill objectFit="contain" />
          )}
        </div>
      </div>
    </div>
  );
});

export default DigitalEvolutionSection;
