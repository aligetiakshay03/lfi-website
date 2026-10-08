"use client";
import React from "react";
import ServicesHeroSection from "../../common/services/heroSection";
import PersistentlyInnovativeBlock from "../../common/PersistentlyInnovative";
import MessageBanner, { IMessageBanner } from "../../common/MessageBanner";
import  ContactUsForm  from "../ContactUsForm";
import { IPersistentlyInnovative } from "../../interfaces/persistentlyInnovative";
import { useTina } from "tinacms/dist/react";
import ConstantlyInnovatingBlock from "../../common/ConstantlyInnovating";
import { IConstantlyInnovating } from "../../interfaces/constantlyInnovating";

interface IConsultingPanelProps {
  heroSectionData: any;
  persistentlyInnovative: IPersistentlyInnovative;
  constantlyInnovating: IConstantlyInnovating;
  messageBannerData: IMessageBanner;
}

const ConsultingPanel = ({
  heroSectionData,
  persistentlyInnovative,
  constantlyInnovating,
  messageBannerData,
}: IConsultingPanelProps) => {
  const { data: persistentlyInnovativeData } = useTina(persistentlyInnovative);
  const { data: constantlyInnovatingData } = useTina(constantlyInnovating);

  return (
    <div>
      <ServicesHeroSection {...heroSectionData} />
      <ConstantlyInnovatingBlock
        constantlyInnovatingData={constantlyInnovatingData}
      />
      <PersistentlyInnovativeBlock
        persistentlyInnovativeData={persistentlyInnovativeData}
      />
      <MessageBanner {...messageBannerData} />
      <ContactUsForm darkTheme={true}/>
    </div>
  );
};

export default ConsultingPanel;
