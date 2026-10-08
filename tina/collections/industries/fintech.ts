import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "../commonObjects/heroSectionData";
import { specializationList } from "../commonObjects/specializationList";
import { projectFlow } from "../commonObjects/projectFlow";
import { messageBannerDataSection } from "../commonObjects/messageBannerDataSection";

export const FintechSchema: Collection = {
    label: "Fintech Page",
    name: "fintech",
    path: "content/industries/fintech",
    format: "json",
    ui: {
      router: () => {
        return "/industries/fintech";
      },
    },
    fields: [
      heroSectionData as TinaField,
      projectFlow("BuildingToolsSection", "Buildings tools section"),
      messageBannerDataSection("leadersMessageBanner", "Leaders message banner"),
      specializationList as TinaField,
    ],
  };