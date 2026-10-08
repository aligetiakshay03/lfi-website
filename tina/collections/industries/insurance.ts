import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "../commonObjects/heroSectionData";
import { specializationList } from "../commonObjects/specializationList";
import { projectFlow } from "../commonObjects/projectFlow";
import { messageBannerDataSection } from "../commonObjects/messageBannerDataSection";

export const InsuranceSchema: Collection = {
  label: "Insurance Page",
  name: "insurance",
  path: "content/industries/insurance",
  format: "json",
  ui: {
    router: () => {
      return "/industries/insurance";
    },
  },
  fields: [
    heroSectionData as TinaField,
    projectFlow("BuildingToolsSection", "Buildings tools section"),
    messageBannerDataSection("leadersMessageBanner", "Leaders message banner"),
    specializationList as TinaField,
  ],
};
