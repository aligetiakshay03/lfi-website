import { Collection, TinaField } from "tinacms";
import { cards } from "../../commonObjects/cards";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { collapseComponent } from "../../commonObjects/collapsecomponents";
import { messageBannerData } from "../../commonObjects/messageBannerData";
import { whatweoffer } from "../../commonObjects/whatweoffer";
import { darkAndLightComponentCards } from "../../commonObjects/darkAndLightComponentCards";
import { projectFlow } from "../../commonObjects/projectFlow";

export const DevOpsPage: Collection = {
  label: "DevOps",
  name: "devOpsPage",
  path: "content/services/engineering/devops",
  format: "json",
  ui: {
    router: () => {
      return "/services/engineering/devops";
    },
  },
  fields: [
    heroSectionData as TinaField,
    messageBannerData as TinaField,
    {
      name: "ProjectFlowCards",
      label: "Project Flow Cards",
      type: "object",
      fields: [
        { name: "status1", label: "status1", type: "string" },
        { name: "heading1", label: "heading1", type: "string" },
      ],
    },
    cards as TinaField,
    collapseComponent as TinaField,
    whatweoffer as TinaField,
    projectFlow("OurBenefits", "Our benefits section"),
    darkAndLightComponentCards as TinaField,
  ],
};
