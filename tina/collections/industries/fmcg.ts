import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "../commonObjects/heroSectionData";
import { projectFlow } from "../commonObjects/projectFlow";
import { specializationList } from "../commonObjects/specializationList";
import { messageBannerDataSection } from "../commonObjects/messageBannerDataSection";

export const FMCGSchema: Collection = {
  label: "FMCG Page",
  name: "fmcg",
  path: "content/industries/fmcg",
  format: "json",
  ui: {
    router: () => {
      return "/industries/fmcg";
    },
  },
  fields: [
    heroSectionData as TinaField,
    projectFlow("BuildingToolsSection", "Buildings tools section"),
    messageBannerDataSection("leadersMessageBanner", "Leaders message banner"),
    specializationList as TinaField,
  ],
};
