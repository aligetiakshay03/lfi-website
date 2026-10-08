"use client";
import React from "react";
import ServicesHeroSection from "../../common/services/heroSection";
import PersistentlyInnovativeBlock from "../../common/PersistentlyInnovative";
import MessageBanner, { IMessageBanner } from "../../common/MessageBanner";
import  ContactUsForm  from "../ContactUsForm";
import { IPersistentlyInnovative } from "../../interfaces/persistentlyInnovative";
import { useTina } from "tinacms/dist/react";
import { IConstantlyInnovating } from "../../interfaces/constantlyInnovating";
import ConstantlyInnovatingBlock from "../../common/ConstantlyInnovating";

interface IEngineeringPanelProps {
  heroSectionData: any;
  persistentlyInnovative: IPersistentlyInnovative;
  constantlyInnovating: IConstantlyInnovating;
  messageBannerData: IMessageBanner;
}

const EngineeringPanel = ({
  heroSectionData,
  persistentlyInnovative,
  constantlyInnovating,
  messageBannerData,
}: IEngineeringPanelProps) => {
  const { data: persistentlyInnovativeData } = useTina(persistentlyInnovative);
  const { data: constantlyInnovatingData } = useTina(constantlyInnovating);

  return (
    <div>
      <ServicesHeroSection {...heroSectionData} />
      <PersistentlyInnovativeBlock
        persistentlyInnovativeData={persistentlyInnovativeData}
      />
      <MessageBanner {...messageBannerData} />
      <ConstantlyInnovatingBlock
        constantlyInnovatingData={constantlyInnovatingData}
      />
      <ContactUsForm darkTheme={true}/>
    </div>
  );
};

export default EngineeringPanel;
