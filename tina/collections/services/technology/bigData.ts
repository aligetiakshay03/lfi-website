import { Collection, TinaField } from "tinacms";
import { projectFlow } from "../../commonObjects/projectFlow";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { messageBannerDataSection } from "../../commonObjects/messageBannerDataSection";
import { flowCards } from "../../commonObjects/flowCards";
import { mediaSection } from "../../commonObjects/mediaSection";

export const bigDataSchema: Collection = {
  label: "Big data Page",
  name: "bigData",
  path: "content/services/technology/big-data",
  format: "json",
  ui: {
    router: () => {
      return "/services/technology/big-data";
    },
  },
  fields: [
    heroSectionData as TinaField,
    projectFlow("bigDataCardSection", "Big-data card section"),
    flowCards("bigDataCards", "Big-data cards"),
    messageBannerDataSection("growthmessage", "Growth Message Banner"),
    mediaSection as TinaField,
  ],
};
