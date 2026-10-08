import { Collection, TinaField } from "tinacms";
import { projectFlow } from "../../commonObjects/projectFlow";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { messageBannerDataSection } from "../../commonObjects/messageBannerDataSection";
import { flowCards } from "../../commonObjects/flowCards";
import { collapseComponent } from "../../commonObjects/collapsecomponents";
import { whatweoffer } from "../../commonObjects/whatweoffer";

export const CloudDevelopmentSchema: Collection = {
  label: "Cloud Development Page",
  name: "cloudDevelopment",
  path: "content/services/cloud/cloudDevelopment",
  format: "json",
  ui: {
    router: () => {
      return "/services/cloud/cloud-development";
    },
  },
  fields: [
    heroSectionData as TinaField,
    projectFlow('achievementSection', 'Achievement Section'),
    flowCards("achievementCards", "Achievement cards"),
    messageBannerDataSection('growthmessage', 'Growth Message Banner'),
    projectFlow('buildingSection', 'Building Section'),
    flowCards("buildingCards", "Building cards"),
    //mediasection
  ],
};