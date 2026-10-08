import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "../commonObjects/heroSectionData";
import { projectFlow } from "../commonObjects/projectFlow";
import { cards } from "../commonObjects/cards";
import { flowCards } from "../commonObjects/flowCards";
import { messageBannerData } from "../commonObjects/messageBannerData";
import { TechonolgyDetails } from "../commonObjects/techonolgyDetails";

export const MicrosoftDynamicsPage: Collection = {
  label: "Microsoft Dynamics",
  name: "microsoftDynamics",
  path: "content/solutions/microsoftDynamics",
  format: "json",
  ui: {
    router: () => {
      return "/solutions/erp-solutions/microsoft-dynamics";
    },
  },
  fields: [
    heroSectionData as TinaField,
    projectFlow("HowCanWeHelpSection", "How can we help"),
    cards as TinaField,
    messageBannerData as TinaField,
    TechonolgyDetails("dynamics365Section", "Dynamics 365 section"),
    flowCards("dynamics365Cards", "dynamics 365 cards"),
  ],
};
