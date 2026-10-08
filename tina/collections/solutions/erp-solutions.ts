import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "../commonObjects/heroSectionData";
import { projectFlow } from "../commonObjects/projectFlow";
import { cards } from "../commonObjects/cards";
import { flowCards } from "../commonObjects/flowCards";
import { messageBannerData } from "../commonObjects/messageBannerData";
import { TechonolgyDetails } from "../commonObjects/techonolgyDetails";
import { collapseComponent } from "../commonObjects/collapsecomponents";

export const ERPSolutionsPage: Collection = {
  label: "Erp Solutions Page",
  name: "erpSolutions",
  path: "content/solutions/erpSolutions",
  format: "json",
  ui: {
    router: () => {
      return "/solutions/erp-solutions/";
    },
  },
  fields: [
    heroSectionData as TinaField,
    projectFlow("TransformingOperations", "Transforming Operations"),
    cards as TinaField,
    collapseComponent as TinaField,
  ],
};