import { Collection, TinaField } from "tinacms";
import { cards } from "../../commonObjects/cards";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { mediaSection } from "../../commonObjects/mediaSection";
import { projectFlow } from "../../commonObjects/projectFlow";
import { darkAndLightComponentCards } from "../../commonObjects/darkAndLightComponentCards";
import { messageBannerDataSection } from "../../commonObjects/messageBannerDataSection";

export const ApplicationDevelopmentPage: Collection = {
  label: "Application Development",
  name: "applicationDevelopment",
  path: "content/services/engineering/applicationDevelopment",
  format: "json",
  ui: {
    router: () => {
      return "/services/engineering/application-development";
    },
  },
  fields: [
    heroSectionData as TinaField,
    projectFlow("Projectflow", "Project flow section"),
    messageBannerDataSection("growthMessage", "Growth message"),
    cards as TinaField,
    mediaSection as TinaField,
    projectFlow("OurSuperPowers", "Our superpowers section"),
    darkAndLightComponentCards as TinaField,
  ],
};
