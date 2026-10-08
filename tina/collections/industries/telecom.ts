import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "../commonObjects/heroSectionData";
import { specializationList } from "../commonObjects/specializationList";
import { projectFlow } from "../commonObjects/projectFlow";
import { messageBannerDataSection } from "../commonObjects/messageBannerDataSection";

export const TelecomSchema: Collection = {
  label: "Telecom Page",
  name: "telecom",
  path: "content/industries/telecom",
  format: "json",
  ui: {
    router: () => {
      return "/industries/telecom";
    },
  },
  fields: [
    heroSectionData as TinaField,
    projectFlow("BuildingToolsSection", "Buildings tools section"),
    messageBannerDataSection("leadersMessageBanner", "Leaders message banner"),
    specializationList as TinaField,
  ],
};
