import { Collection, TinaField } from "tinacms";
import { projectFlow } from "../../commonObjects/projectFlow";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { messageBannerDataSection } from "../../commonObjects/messageBannerDataSection";
import { flowCards } from "../../commonObjects/flowCards";

export const IPaaSSchema: Collection = {
  label: "IPaaS Page",
  name: "iPaaS",
  path: "content/services/cloud/ipaas",
  format: "json",
  ui: {
    router: () => {
      return "/services/cloud/ipaas";
    },
  },
  fields: [
    heroSectionData as TinaField,
    projectFlow("achievementSection", "Achievement Section"),
    flowCards("achievementCards", "Achievement cards"),
    messageBannerDataSection("growthmessage", "Growth Message Banner"),
    projectFlow("buildingSection", "Building Section"),
    flowCards("buildingCards", "Building cards"),
  ],
};
