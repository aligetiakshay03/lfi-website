import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { fullPageAccordion } from "../../commonObjects/fullPageAccordion";

export const SapSpecialExpertise: Collection = {
  label: "SAP Special Expertise",
  name: "sapSpecialExpertise",
  path: "content/solutions/sap/sapSpecialExpertise",
  format: "json",
  ui: {
    router: () => {
      return "/solutions/erp-solutions/sap/sap-special-expertise";
    },
  },
  fields: [
    heroSectionData as TinaField,
    fullPageAccordion as TinaField,
  ],
};