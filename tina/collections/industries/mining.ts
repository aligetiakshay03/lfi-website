import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "../commonObjects/heroSectionData";
import { specializationList } from "../commonObjects/specializationList";
import { projectFlow } from "../commonObjects/projectFlow";
import { messageBannerDataSection } from "../commonObjects/messageBannerDataSection";

export const MiningSchema: Collection = {
    label: "Mining Page",
    name: "mining",
    path: "content/industries/mining",
    format: "json",
    ui: {
      router: () => {
        return "/industries/mining";
      },
    },
    fields: [
      heroSectionData as TinaField,
      projectFlow("BuildingToolsSection", "Buildings tools section"),
      messageBannerDataSection("leadersMessageBanner", "Leaders message banner"),
      specializationList as TinaField,
    ],
  };