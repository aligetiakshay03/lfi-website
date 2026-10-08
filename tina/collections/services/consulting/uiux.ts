import { Collection, TinaField } from "tinacms";
import { cards } from "../../commonObjects/cards";
import { collapseComponent } from "../../commonObjects/collapsecomponents";
import { messageBannerData } from "../../commonObjects/messageBannerData";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { projectFlow } from "../../commonObjects/projectFlow";

export const uiuxSchema: Collection = {
  label: "UI/UX Schema",
  name: "uiux",
  path: "content/services/uiux",
  format: "json",
  ui: {
    router: () => {
      return "/services/consulting/uiux-design";
    },
  },
  fields: [
    heroSectionData as TinaField,
    // projectFlowCards as TinaField,
    projectFlow('Projectflow', 'Project flow section'),
    messageBannerData as TinaField,
    cards as TinaField,
    collapseComponent as TinaField,
  ],
};
