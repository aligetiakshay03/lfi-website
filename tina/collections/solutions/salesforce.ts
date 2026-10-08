import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "../commonObjects/heroSectionData";
import { projectFlow } from "../commonObjects/projectFlow";
import { cards } from "../commonObjects/cards";
import { messageBannerData } from "../commonObjects/messageBannerData";


export const SalesforcePage: Collection = {
  label: "Salesforce",
  name: "salesforce",
  path: "content/solutions/salesforce",
  format: "json",
  ui: {
    router: () => {
      return "/solutions/erp-solutions/salesforce";
    },
  },
  fields: [
    heroSectionData as TinaField,
    projectFlow("HowCanWeHelpSection", "How can we help"),
    cards as TinaField,
    messageBannerData as TinaField,
  ],
};
