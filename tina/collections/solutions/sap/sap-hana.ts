import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { messageBannerData } from "../../commonObjects/messageBannerData";
import { collapseComponent } from "../../commonObjects/collapsecomponents";
import { projectFlow } from "../../commonObjects/projectFlow";
import { flowCards } from "../../commonObjects/flowCards";

export const SAPHanaPage: Collection = {
  label: "SAPHana",
  name: "sap_hana",
  path: "content/solutions/sap/sap-hana",
  format: "json",
  ui: {
    router: () => {
      return "/solutions/erp-solutions/sap/sap-hana";
    },
  },
  fields: [
    heroSectionData as TinaField,
    collapseComponent as TinaField,
    projectFlow("howCanWeHelpSection", "How can we help"),
    flowCards("sapCards", "SAP Cards"),
    projectFlow("offerDetails", "Our offerings details"),
    flowCards("offerDetailCards", "Offerings"),
  ],
};
