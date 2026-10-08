import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "../commonObjects/heroSectionData";
import { specializationList } from "../commonObjects/specializationList";
import { projectFlow } from "../commonObjects/projectFlow";
import { messageBannerDataSection } from "../commonObjects/messageBannerDataSection";

export const OilandGasSchema: Collection = {
    label: "Oil & Gas Page",
    name: "oilandgas",
    path: "content/industries/oilandgas",
    format: "json",
    ui: {
      router: () => {
        return "/industries/oil-gas";
      },
    },
    fields: [
      heroSectionData as TinaField,
      projectFlow("BuildingToolsSection", "Buildings tools section"),
      messageBannerDataSection("leadersMessageBanner", "Leaders message banner"),
      specializationList as TinaField,
    ],
  };