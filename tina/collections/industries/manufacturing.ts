import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "../commonObjects/heroSectionData";
import { specializationList } from "../commonObjects/specializationList";
import { projectFlow } from "../commonObjects/projectFlow";
import { messageBannerDataSection } from "../commonObjects/messageBannerDataSection";

export const ManufacturingSchema: Collection = {
  label: "Manufacturing Page",
  name: "manufacturing",
  path: "content/industries/manufacturing",
  format: "json",
  ui: {
    router: () => {
      return "/industries/manufacturing";
    },
  },
  fields: [
    heroSectionData as TinaField,
    projectFlow("BuildingToolsSection", "Buildings tools section"),
    messageBannerDataSection("leadersMessageBanner", "Leaders message banner"),
    specializationList as TinaField,
  ],
};
