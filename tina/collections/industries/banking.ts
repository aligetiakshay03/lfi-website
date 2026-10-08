import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "../commonObjects/heroSectionData";
import { specializationList } from "../commonObjects/specializationList";
import { projectFlow } from "../commonObjects/projectFlow";
import { messageBannerDataSection } from "../commonObjects/messageBannerDataSection";

export const BankingSchema: Collection = {
  label: "Banking Page",
  name: "banking",
  path: "content/industries/banking",
  format: "json",
  ui: {
    router: () => {
      return "/industries/banking";
    },
  },
  fields: [
    heroSectionData as TinaField,
    projectFlow("BuildingToolsSection", "Buildings tools section"),
    messageBannerDataSection("leadersMessageBanner", "Leaders message banner"),
    specializationList as TinaField,
  ],
};
