import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { cards } from "../../commonObjects/cards";
import { TechonolgyDetails } from "../../commonObjects/techonolgyDetails";
import { howCanWeHelpData } from "../../commonObjects/howCanWeHelp";

export const DataServicesPage: Collection = {
  label: "Data Services",
  name: "dataServices",
  path: "content/solutions/sap/dataServices",
  format: "json",
  ui: {
    router: () => {
      return "/solutions/erp-solutions/sap/data-services";
    },
  },
  fields: [
    heroSectionData as TinaField,
    TechonolgyDetails("keyComponents", "Key components"),
    cards as TinaField,
    TechonolgyDetails("keyCapabilities", "Key Capabilities"),
    howCanWeHelpData as TinaField,
  ],
};
