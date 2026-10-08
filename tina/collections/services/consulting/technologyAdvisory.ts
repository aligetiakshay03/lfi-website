import { Collection, TinaField } from "tinacms";
import { projectFlow } from "../../commonObjects/projectFlow";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { messageBannerDataSection } from "../../commonObjects/messageBannerDataSection";
import { flowCards } from "../../commonObjects/flowCards";
import { whatweoffer } from "../../commonObjects/whatweoffer";

export const TechnologyAdvisorySchema: Collection = {
    label: "Technology Advisory Page",
    name: "techAdvisory",
    path: "content/services/consulting/techAdvisory",
    format: "json",
    ui: {
      router: () => {
        return "/services/consulting/technology-advisory";
      },
    },
    fields: [
      heroSectionData as TinaField,
      // projectFlowCards as TinaField,
      whatweoffer as TinaField,
      projectFlow('Projectflow', 'Project flow section'),
      messageBannerDataSection('growthmessage', 'Growth Message Banner'),
      flowCards("transformationCards", "Transformation cards")
    ],
  };