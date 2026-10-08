import { Collection, TinaField } from "tinacms";
import { cards } from "../../commonObjects/cards";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { mediaSection } from "../../commonObjects/mediaSection";
import { collapseComponent } from "../../commonObjects/collapsecomponents";
import { projectFlow } from "../../commonObjects/projectFlow";
import { darkAndLightComponentCards } from "../../commonObjects/darkAndLightComponentCards";
import { messageBannerData } from "../../commonObjects/messageBannerData";

export const QualityControlPage: Collection = {
  label: "Quality Control",
  name: "qualityControl",
  path: "content/services/engineering/qualityControl",
  format: "json",
  ui: {
    router: () => {
      return "/services/engineering/quality-control";
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
    mediaSection as TinaField,
    collapseComponent as TinaField,
    projectFlow("Benefits", "Benefits section"),
    darkAndLightComponentCards as TinaField,
  ],
};
