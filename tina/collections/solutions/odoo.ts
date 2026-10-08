import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "../commonObjects/heroSectionData";
import { projectFlow } from "../commonObjects/projectFlow";
import { cards } from "../commonObjects/cards";
import { flowCards } from "../commonObjects/flowCards";
import { messageBannerData } from "../commonObjects/messageBannerData";
import { TechonolgyDetails } from "../commonObjects/techonolgyDetails";

export const OdooPage: Collection = {
  label: "Odoo",
  name: "odoo",
  path: "content/solutions/odoo",
  format: "json",
  ui: {
    router: () => {
      return "/solutions/erp-solutions/odoo";
    },
  },
  fields: [
    heroSectionData as TinaField,
    projectFlow("Benefits", "Benefits"),
    cards as TinaField,
    messageBannerData as TinaField,
    TechonolgyDetails(
      "odooImplementationAreasSection",
      "Odoo implementation area section"
    ),
    flowCards(
      "OdooImplementationAreasCards",
      "odoo implementation areas cards"
    ),
  ],
};
