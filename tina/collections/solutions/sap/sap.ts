import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { projectFlow } from "../../commonObjects/projectFlow";
import { cards } from "../../commonObjects/cards";
import { messageBannerData } from "../../commonObjects/messageBannerData";

export const SAPPage: Collection = {
  label: "SAP",
  name: "sap",
  path: "content/solutions/sap/sap",
  format: "json",
  ui: {
    router: () => {
      return "/solutions/erp-solutions/sap";
    },
  },
  fields: [
    heroSectionData as TinaField,
    projectFlow("HowCanWeHelpSection", "How can we help"),
    cards as TinaField,
    messageBannerData as TinaField,
  ],
};
