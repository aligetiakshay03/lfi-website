import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { cards } from "../../commonObjects/cards";
import { TechonolgyDetails } from "../../commonObjects/techonolgyDetails";
import { howCanWeHelpData } from "../../commonObjects/howCanWeHelp";
import { collapseComponent } from "../../commonObjects/collapsecomponents";
import { projectFlow } from "../../commonObjects/projectFlow";
import { flowCards } from "../../commonObjects/flowCards";

export const CoreSapExpertise: Collection = {
  label: "Core SAP Expertise",
  name: "coreSapExpertise",
  path: "content/solutions/sap/coreSapExpertise",
  format: "json",
  ui: {
    router: () => {
      return "/solutions/erp-solutions/sap/core-sap-expertise";
    },
  },
  fields: [
    heroSectionData as TinaField,
    collapseComponent as TinaField,
    projectFlow("accordionFlow", "Accordions Section"),
    flowCards("accordionContent", "Accordion cards"),
    projectFlow("rollouts", 'Rollouts'),
    flowCards("rolloutCards", "Roll out cards"),
  ],
};