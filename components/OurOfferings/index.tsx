import React from "react";
import styles from "./our-offering.module.scss";
import PlatformsComponent from "../../common/platforms";
import IndustriesCard from "../../common/IndustriesCard";
import {
  ConstantlyInnovatingImageBlock,
  StaffAugmentationPerformingLanguages,
  StaffAugmentationPlatforms,
} from "../../tina/__generated__/types";
interface IOurOffering {
  platforms: StaffAugmentationPlatforms;
  performingLanguages?: StaffAugmentationPerformingLanguages;
  imageBlock: ConstantlyInnovatingImageBlock[];
}

const OurOffering = ({
  platforms,
  performingLanguages,
  imageBlock,
}: IOurOffering) => {
  return (
    <div className={styles.container}>
      <PlatformsComponent
        data={{...performingLanguages}}
      />
      <PlatformsComponent
        data={{...platforms}}
      />
      <div>
        <h3 className="text-base md:text-lg 2xl:text-[28px] font-normal mb-6 2xl:mb-8">
          Industries
        </h3>
        <IndustriesCard
          imageBlock={imageBlock as ConstantlyInnovatingImageBlock[]}
        />
      </div>
    </div>
  );
};

export default OurOffering;
