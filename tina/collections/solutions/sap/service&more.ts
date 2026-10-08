import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { projectFlow } from "../../commonObjects/projectFlow";
import { cards } from "../../commonObjects/cards";
import { flowCards } from "../../commonObjects/flowCards";
import { TechonolgyDetails } from "../../commonObjects/techonolgyDetails";

export const ServiceAndMorePage: Collection = {
  label: "Service and more",
  name: "serviceAndMore",
  path: "content/solutions/sap/service&more",
  format: "json",
  ui: {
    router: () => {
      return "/solutions/erp-solutions/sap/service&more";
    },
  },
  fields: [
    heroSectionData as TinaField,
    projectFlow("S_4_Hana", "S/4 Hana"),
    cards as TinaField,
    projectFlow(
      "marketingAndPromotionsHeading",
      "Marketing and Promotions Heading"
    ),
    TechonolgyDetails(
      "marketingAndPromotionsContent",
      "Marketing and Promotions Content"
    ),
    TechonolgyDetails("differentiators", "Differentiators"),
    flowCards("differentiatorsCards", "Differentiators cards"),
    TechonolgyDetails("coreServices", "Core Services"),
    flowCards("coreServicesCards", "Core Services cards"),
  ],
};
